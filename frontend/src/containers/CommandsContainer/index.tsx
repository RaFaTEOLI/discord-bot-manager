import { useCallback, useState, useEffect } from 'react';

import Button from '../../components/Button';
import Filter from '../../components/Filter';

import {
  Container,
  FilterContainer,
  ButtonContainer,
  ListCommandsContainer,
} from './styles';

import api from '../../services/api';
import CommandCard from '../../components/Card';

interface ICommand {
  id: number;
  command: string;
  dispatcher: string;
  type: string;
  description: string;
  response: boolean;
}

function CommandsContainer() {
  const [searchInput, setSearchInput] = useState('');
  const [commands, setCommands] = useState<ICommand[]>([]);

  useEffect(() => {
    api.get(`/commands`).then(response => {
      setCommands(response.data);
    });
  }, [commands]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchInput(e.target.value);
    },
    []
  );

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
          <Button>Add Command</Button>
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
    </>
  );
}

export default CommandsContainer;
