import { useState, useEffect } from 'react';

import Player from '../../components/Player';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

import CommandsContainer from '../../containers/CommandsContainer';

import { HomeContent } from './styles';

import api from '../../services/api';
import QueueContainer from '../../containers/QueueContainer';

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

interface HomeProps {
  handleToggle: () => void;
  theme: string;
}

const Home = ({ handleToggle, theme }: HomeProps) => {
  const [bot, setBot] = useState<IBot>();
  const [music, setMusic] = useState<IMusic>();
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(true);

  const showModal = (): void => {
    setShow(true);
  };

  const hideModal = (): void => {
    setShow(false);
  };

  const getMusic = () => {
    api.get('/music').then(response => {
      if (response.data) {
        setMusic(response.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    api.get('/bot').then(response => {
      if (response.data) {
        setBot(response.data[0]);
        setLoading(false);
      }
    });

    getMusic();

    const interval = setInterval(() => {
      api.get('/music').then(response => {
        if (response.data) {
          setMusic(response.data);
          setLoading(false);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header theme={theme} handleToggle={handleToggle} title={bot?.name} />
          <HomeContent>
            <Player
              name={music?.name}
              artist={music?.artist}
              albumImage={music?.albumImage}
              getMusic={getMusic}
              showModal={showModal}
            />
            <CommandsContainer />
            <QueueContainer show={show} hideModal={hideModal} />
          </HomeContent>
        </>
      )}
    </>
  );
};

export default Home;
