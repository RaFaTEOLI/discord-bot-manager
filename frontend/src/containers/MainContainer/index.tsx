import { useState, useEffect } from 'react';
import Player from '../../components/Player';

import Header from '../../components/Header';
import CommandsContainer from '../../containers/CommandsContainer';

import { Content } from './styles';

import api from '../../services/api';

interface IBot {
  name: string;
  description: string;
}

function MainContainer() {
  const [bot, setBot] = useState<IBot>();
  useEffect(() => {
    api.get(`/bot`).then(response => {
      if (response.data) {
        setBot(response.data[0]);
      }
    });
  }, []);
  return (
    <>
      <Header title={bot?.name} />
      <Content>
        <Player />
        <CommandsContainer />
      </Content>
    </>
  );
}

export default MainContainer;
