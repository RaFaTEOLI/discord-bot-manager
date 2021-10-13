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
// import goBackImg from '../../assets/goback.svg';
import emptyAlbumImg from '../../assets/emptyAlbum.png';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
interface PlayerProps {
  name?: string;
  artist?: string;
  albumImage?: string;
}

function Player({ name, artist, albumImage }: PlayerProps) {
  const [paused, setPaused] = useState<boolean>(false);

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
            toast.success('Command ran!');
          })
          .catch(() => {
            toast.error('Error running command!');
          });
      }
    },
    [setPaused]
  );

  return (
    <PlayerContainer>
      <Playing>
        <img src={musicImg} alt='Music' />
        <p>{paused ? 'Paused' : 'Now Playing...'}</p>
      </Playing>
      <Controls>
        {/* <img src={goBackImg} alt='Go Back' /> */}

        {paused ? (
          <img
            src={pauseImg}
            onClick={() => runCommand('!resume')}
            alt='Play'
          />
        ) : (
          <img
            src={pauseImg}
            onClick={() => runCommand('!pause')}
            alt='Pause'
          />
        )}
        <img src={skipImg} onClick={() => runCommand('!skip')} alt='Skip' />
      </Controls>
      <Music>
        <MusicTitle>
          {' '}
          <p>{name}</p>
          <p>{artist}</p>
        </MusicTitle>
        <img
          src={albumImage ? albumImage : emptyAlbumImg}
          height='60'
          width='60'
          alt='Album'
        />
      </Music>
    </PlayerContainer>
  );
}

export default Player;
