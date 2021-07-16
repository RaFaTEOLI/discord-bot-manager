import { useCallback, useState, useEffect, useMemo } from 'react';

import Button from '../../components/Button';
import Filter from '../../components/Filter';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Container,
  FilterContainer,
  ButtonContainer,
  ListCommandsContainer,
  FormContainer,
} from './styles';

import api from '../../services/api';
import CommandCard from '../../components/Card';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';

export interface ICommand {
  id: number;
  command: string;
  dispatcher: string;
  type: string;
  description: string;
  response: boolean;
}

interface IType {
  name: string;
}
function CommandsContainer() {
  const [searchInput, setSearchInput] = useState('');
  const [commandId, setCommandId] = useState(0);
  const [dispatcher, setDispatcher] = useState('');
  const [type, setType] = useState('');
  const [command, setCommand] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState('');

  const [types, setTypes] = useState<IType[]>([]);
  const [commands, setCommands] = useState<ICommand[]>([]);

  const [show, setShow] = useState(false);

  const showModal = (): void => {
    setShow(true);
  };

  const hideModal = (): void => {
    setShow(false);
  };

  useEffect(() => {
    fetchCommands();
  }, []);

  useEffect(() => {
    api.get(`/types`).then(response => {
      setTypes(response.data);
    });
  }, []);

  const fetchCommands = () => {
    api.get(`/commands`).then(response => {
      setCommands(response.data);
    });
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchInput(e.target.value);
    },
    []
  );

  const handleDispatcherChange = useCallback(e => {
    setDispatcher(e.target.value);
  }, []);

  const handleTypeChange = useCallback(e => {
    setType(e.target.value);
  }, []);

  const editCommand = (id: number) => {
    setCommandId(id);
    api.get(`/commands/${id}`).then(response => {
      setCommand(response.data.command);
      setDescription(response.data.description);
      setDispatcher(response.data.dispatcher);
      setType(response.data.type);
      setResponse(response.data.response);

      if (response.data.type === 'message' || response.data.type === 'music') {
        showModal();
      } else {
        toast.error("You can't edit this command");
      }
    });
  };

  const showAddModal = () => {
    setCommand('');
    setDescription('');
    setDispatcher('');
    setType('');
    setResponse('');
    showModal();
  };

  const submitForm = () => {
    if (command && type && description && dispatcher && response) {
      if (commandId) {
        api
          .put(`/commands/${commandId}`, {
            command: command.replaceAll('!', ''),
            type,
            description,
            dispatcher,
            response,
          })
          .then(response => {
            if (response.data.id) {
              fetchCommands();
              toast.success('Command updated!');
              hideModal();
            } else {
              toast.error('Error updating command!');
            }
          })
          .catch(err => {
            toast.error('Error creating command!');
          });
      } else {
        api
          .post(`/commands`, {
            command: command.replaceAll('!', ''),
            type,
            description,
            dispatcher,
            response,
          })
          .then(response => {
            if (response.data.id) {
              fetchCommands();
              toast.success('Command created!');
              hideModal();
            } else {
              toast.error('Error creating command!');
            }
          })
          .catch(err => {
            toast.error('Error creating command!');
          });
      }
    } else {
      toast.error('All fields are required!');
    }
  };

  const removeCommand = () => {
    api
      .delete(`/commands/${commandId}`)
      .then(response => {
        fetchCommands();
        toast.success('Command deleted!');
        // eslint-disable-next-line
        const newCommands = commands.filter(command => command.id != commandId);
        setCommands(newCommands);
        hideModal();
      })
      .catch(err => {
        toast.error('Error deleting command!');
      });
  };

  const formattedTypes = useMemo(() => {
    if (types.length > 0) {
      return types.map(type => type.name);
    }
    return [];
  }, [types]);

  const filteredCommands = useMemo(() => {
    return commands.filter((command: ICommand) => {
      return command.command.toLowerCase().includes(searchInput.toLowerCase());
    });
  }, [commands, searchInput]);

  return (
    <>
      <Container>
        <FilterContainer>
          <Filter handleChange={handleChange} />
        </FilterContainer>
        <ButtonContainer>
          <Button onClick={showAddModal}>Add Command</Button>
        </ButtonContainer>
      </Container>
      <ListCommandsContainer>
        {filteredCommands.map(command => (
          <CommandCard
            key={command.id}
            command={command.command}
            description={command.description}
            handleClick={() => editCommand(command.id)}
          />
        ))}
      </ListCommandsContainer>
      <Modal show={show} title='Command' handleClose={hideModal}>
        <>
          <FormContainer>
            <Input
              name='command'
              value={command}
              onChange={event => setCommand(event.target.value)}
              placeholder='Command'
            />
            <Input
              name='description'
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder='Description'
            />
            <Select
              data={['client', 'message']}
              value={dispatcher}
              placeholder='Dispatcher'
              handleSelectChange={handleDispatcherChange}
            />
            <Select
              data={formattedTypes}
              placeholder='Type'
              value={type}
              handleSelectChange={handleTypeChange}
            />
            <Input
              name='response'
              onChange={event => setResponse(event.target.value)}
              value={response}
              placeholder='Response'
            />
            <Button onClick={submitForm}>Save</Button>
            {commandId > 0 && (type === 'message' || type === 'music') && (
              <Button type='danger' onClick={removeCommand}>
                Remove
              </Button>
            )}
          </FormContainer>
        </>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default CommandsContainer;
