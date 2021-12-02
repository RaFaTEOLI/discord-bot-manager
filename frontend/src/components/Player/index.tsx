import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import {
  PlayerContainer,
  Playing,
  Controls,
  Music,
  MusicTitle,
} from './styles';

import musicImg from '../../assets/music.svg';
import skipImg from '../../assets/skip.svg';
import pauseImg from '../../assets/pause.svg';
import queueImg from '../../assets/queue.svg';
// import goBackImg from '../../assets/goback.svg';
import emptyAlbumImg from '../../assets/emptyAlbum.png';
import api from '../../services/api';

interface PlayerProps {
  name?: string;
  artist?: string;
  albumImage?: string;
  getMusic: () => void;
  showModal: () => void;
}

const Player = ({
  name,
  artist,
  albumImage,
  getMusic,
  showModal,
}: PlayerProps) => {
  const [paused, setPaused] = useState<boolean>(false);

  const wait = (timeout: number) =>
    new Promise(resolve => {
      setTimeout(resolve, timeout);
    });

  const runCommand = useCallback(
    (command: string) => {
      if (command === '!pause') {
        setPaused(true);
      } else if (command === '!play') {
        setPaused(false);
      }
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
            if (command === '!skip') {
              wait(8000).then(() => getMusic());
            }
          })
          .catch(() => {
            toast.error('❌ Error running command!');
          });
      }
    },
    [setPaused, getMusic],
  );

  return (
    <PlayerContainer>
      <Playing>
        <img src={musicImg} alt="Music" />
        <p>{paused ? 'Paused' : 'Now Playing...'}</p>
      </Playing>
      <Controls>
        {/* <img src={goBackImg} alt='Go Back' /> */}
        <img
          height={48}
          width={48}
          src={queueImg}
          onClick={showModal}
          alt="Queue"
        />
        {paused ? (
          <img
            height={48}
            width={48}
            src={pauseImg}
            onClick={() => runCommand('!resume')}
            alt="Play"
          />
        ) : (
          <img
            height={48}
            width={48}
            src={pauseImg}
            onClick={() => runCommand('!pause')}
            alt="Pause"
          />
        )}
        <img
          height={48}
          width={48}
          src={skipImg}
          onClick={() => runCommand('!skip')}
          alt="Skip"
        />
      </Controls>
      <Music>
        <MusicTitle>
          {' '}
          <p>{name}</p>
          <p>{artist}</p>
        </MusicTitle>
        <img
          src={albumImage || emptyAlbumImg}
          height="60"
          width="60"
          alt="Album"
        />
      </Music>
    </PlayerContainer>
  );
};

export default Player;
