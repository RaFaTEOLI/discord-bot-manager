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

interface ICommand {
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
    api.get(`/commands`).then(response => {
      setCommands(response.data);
    });
  }, [commands]);

  useEffect(() => {
    api.get(`/types`).then(response => {
      setTypes(response.data);
    });
  }, []);

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

  const submitForm = () => {
    if (command && type && description && dispatcher && response) {
      api
        .post(`/commands`, {
          command,
          type,
          description,
          dispatcher,
          response,
        })
        .then(response => {
          if (response.data.id) {
            toast.success('Command created!');
            hideModal();
          } else {
            toast.error('Error creating command!');
          }
        })
        .catch(err => {
          toast.error('Error creating command!');
        });
    } else {
      toast.error('All fields are required!');
    }
  };

  const formattedTypes = useMemo(() => {
    if (types.length > 0) {
      return types.map(type => type.name);
    }
    return [];
  }, [types]);

  const filteredCommands = commands.filter((command: ICommand) => {
    return command.command.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <>
      <Container>
        <FilterContainer>
          <Filter handleChange={handleChange} />
        </FilterContainer>
        <ButtonContainer>
          <Button onClick={showModal}>Add Command</Button>
        </ButtonContainer>
      </Container>
      <ListCommandsContainer>
        {filteredCommands.map(command => (
          <CommandCard
            key={command.id}
            command={command.command}
            description={command.description}
          />
        ))}
      </ListCommandsContainer>
      <Modal show={show} title='New Command' handleClose={hideModal}>
        <>
          <FormContainer>
            <Input
              name='command'
              onChange={event => setCommand(event.target.value)}
              placeholder='Command'
            />
            <Input
              name='description'
              onChange={event => setDescription(event.target.value)}
              placeholder='Description'
            />
            <Select
              data={['client', 'message']}
              placeholder='Dispatcher'
              handleSelectChange={handleDispatcherChange}
            />
            <Select
              data={formattedTypes}
              placeholder='Type'
              handleSelectChange={handleTypeChange}
            />
            <Input
              name='response'
              onChange={event => setResponse(event.target.value)}
              placeholder='Response'
            />
            <Button onClick={submitForm}>Save</Button>
          </FormContainer>
        </>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default CommandsContainer;
