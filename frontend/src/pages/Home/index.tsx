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
  id: string;
  name: string;
  artist: string;
  albumImage: string;
}

function Home() {
  const [bot, setBot] = useState<IBot>();
  const [music, setMusic] = useState<IMusic>();

  useEffect(() => {
    api.get(`/bot`).then(response => {
      if (response.data) {
        setBot(response.data[0]);
      }
    });

    api.get(`/music`).then(response => {
      if (response.data) {
        setMusic(response.data);
      }
    });

    const interval = setInterval(() => {
      api.get(`/music`).then(response => {
        if (response.data) {
          setMusic(response.data);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header title={bot?.name} />
      <Content>
        <Player
          name={music?.name}
          artist={music?.artist}
          albumImage={music?.albumImage}
        />
        <CommandsContainer />
      </Content>
    </>
  );
}

export default Home;
