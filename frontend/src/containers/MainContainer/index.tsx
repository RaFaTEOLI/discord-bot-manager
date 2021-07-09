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

interface IMusic {
  currentSong: string;
}

function MainContainer() {
  const [bot, setBot] = useState<IBot>();
  const [music, setMusic] = useState<IMusic>();

  useEffect(() => {
    api.get(`/bot`).then(response => {
      if (response.data) {
        setBot(response.data[0]);
      }
    });
  }, []);

  useEffect(() => {
    api.get(`/music`).then(response => {
      if (response.data) {
        setMusic(response.data);
      }
    });
  }, []);
  return (
    <>
      <Header title={bot?.name} />
      <Content>
        <Player musicName={music?.currentSong} />
        <CommandsContainer />
      </Content>
    </>
  );
}

export default MainContainer;
