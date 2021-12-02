import { useCallback, useState, useEffect, useMemo } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import Button from '../../components/Button';
import Filter from '../../components/Filter';

import 'react-toastify/dist/ReactToastify.css';

import {
  Container,
  FilterContainer,
  ButtonContainer,
  ListCommandsContainer,
  FormContainer,
  ContentContainer,
} from './styles';

import api from '../../services/api';
import CommandCard from '../../components/Card';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Sidebar';

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
const CommandsContainer = () => {
  const [searchInput, setSearchInput] = useState('');
  const [commandId, setCommandId] = useState(0);
  const [dispatcher, setDispatcher] = useState('');
  const [type, setType] = useState('');
  const [command, setCommand] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState('');

  const [types, setTypes] = useState<IType[]>([]);
  const [commands, setCommands] = useState<ICommand[]>([]);

  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);

  const showModal = (): void => {
    setShow(true);
  };

  const hideModal = (): void => {
    setShow(false);
  };

  const fetchCommands = () => {
    api.get('/commands').then(res => {
      setCommands(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCommands();
  }, []);

  useEffect(() => {
    api.get('/types').then(res => {
      setTypes(res.data);
    });
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchInput(e.target.value);
    },
    [],
  );

  const handleDispatcherChange = useCallback(e => {
    setDispatcher(e.target.value);
  }, []);

  const handleTypeChange = useCallback(e => {
    setType(e.target.value);
  }, []);

  const editCommand = (id: number) => {
    setCommandId(id);
    api.get(`/commands/${id}`).then(res => {
      setCommand(res.data.command);
      setDescription(res.data.description);
      setDispatcher(res.data.dispatcher);
      setType(res.data.type);
      setResponse(res.data.response);

      if (res.data.type === 'message' || res.data.type === 'music') {
        showModal();
      } else {
        toast.error("You can't edit this command");
      }
    });
  };

  const showAddModal = () => {
    setCommandId(0);
    setCommand('');
    setDescription('');
    setDispatcher('');
    setType('');
    setResponse('');
    showModal();
  };

  const submitForm = () => {
    if (type === 'message' || type === 'music') {
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
            .then(res => {
              if (res.status === 204) {
                fetchCommands();
                toast.success('✅ Command updated!');
                hideModal();
              } else {
                toast.error('❌ Error updating command!');
              }
            })
            .catch(() => {
              toast.error('❌ Error creating command!');
            });
        } else {
          api
            .post('/commands', {
              command: command.replaceAll('!', ''),
              type,
              description,
              dispatcher,
              response,
            })
            .then(res => {
              if (res.status === 204) {
                fetchCommands();
                toast.success('✅ Command created!');
                hideModal();
              } else {
                toast.error('❌ Error creating command!');
              }
            })
            .catch(() => {
              toast.error('❌ Error creating command!');
            });
        }
      } else {
        toast.error('❌ All fields are required!');
      }
    } else {
      toast.error("You can't edit this command");
    }
  };

  const removeCommand = () => {
    if (type === 'message' || type === 'music') {
      api
        .delete(`/commands/${commandId}`)
        .then(() => {
          fetchCommands();
          toast.success('✅ Command deleted!');
          const newCommands = commands.filter(
            // eslint-disable-next-line
            command => command.id != commandId,
          );
          setCommands(newCommands);
          hideModal();
        })
        .catch(() => {
          toast.error('❌ Error deleting command!');
        });
    } else {
      toast.error("You can't remove this command");
    }
  };

  const runCommand = () => {
    const botName = process.env.REACT_APP_BOT_NAME;
    const imgUrl = `https://robohash.org/${botName}?gravatar=hashed`;
    const webHook = process.env.REACT_APP_WEBHOOK;
    if (webHook) {
      const requestBody = {
        username: `${botName} Web`,
        avatar_url: imgUrl,
        content: `${command}`,
      };
      api
        .post(webHook, requestBody)
        .then(() => {
          toast.success('✅ Command ran!');
          hideModal();
        })
        .catch(() => {
          toast.error('❌ Error running command!');
        });
    }
  };

  const formattedTypes = useMemo(() => {
    if (types.length > 0) {
      return types.map(tp => tp.name);
    }
    return [];
  }, [types]);

  const filteredCommands = useMemo(
    () =>
      commands.filter((cmd: ICommand) =>
        cmd.command.toLowerCase().includes(searchInput.toLowerCase()),
      ),
    [commands, searchInput],
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <FilterContainer>
              <Filter handleChange={handleChange} />
            </FilterContainer>
            <ButtonContainer>
              <Button onClick={showAddModal}>Add Command</Button>
            </ButtonContainer>
          </Container>
          <ContentContainer>
            <ListCommandsContainer>
              {filteredCommands.map(cmd => (
                <CommandCard
                  key={cmd.id}
                  command={cmd.command}
                  description={cmd.description}
                  handleClick={() => editCommand(cmd.id)}
                />
              ))}
            </ListCommandsContainer>
            <Sidebar />
          </ContentContainer>
          <Modal show={show} title="Command" handleClose={hideModal}>
            <FormContainer>
              <Input
                name="command"
                value={command}
                onChange={event => setCommand(event.target.value)}
                placeholder="Command"
              />
              <Input
                name="description"
                value={description}
                onChange={event => setDescription(event.target.value)}
                placeholder="Description"
              />
              <Select
                data={['client', 'message']}
                value={dispatcher}
                placeholder="Dispatcher"
                handleSelectChange={handleDispatcherChange}
              />
              <Select
                data={formattedTypes}
                placeholder="Type"
                value={type}
                handleSelectChange={handleTypeChange}
              />
              <Input
                name="response"
                onChange={event => setResponse(event.target.value)}
                value={response}
                placeholder="Response"
              />
              <Button onClick={submitForm}>Save</Button>
              {commandId && <Button onClick={runCommand}>Run</Button>}
              {commandId && (type === 'message' || type === 'music') && (
                <Button type="danger" onClick={removeCommand}>
                  Remove
                </Button>
              )}
            </FormContainer>
          </Modal>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
        </>
      )}
    </>
  );
};

export default CommandsContainer;
