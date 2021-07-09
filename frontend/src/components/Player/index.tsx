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
import goBackImg from '../../assets/goback.svg';
import linkinParkImg from '../../assets/linkinPark.svg';

interface PlayerProps {
  musicName?: string;
}

function Player({ musicName }: PlayerProps) {
  const name = musicName?.split('-')[0] ? musicName?.split('-')[0] : '';
  const band = musicName?.split('-')[1] ? musicName?.split('-')[1] : '';
  return (
    <PlayerContainer>
      <Playing>
        <img src={musicImg} alt='Music' />
        <p>Now Playing...</p>
      </Playing>
      <Controls>
        <img src={goBackImg} alt='Go Back' />
        <img src={pauseImg} alt='Pause' />
        <img src={skipImg} alt='Skip' />
      </Controls>
      <Music>
        <MusicTitle>
          {' '}
          <p>{name}</p>
          <p>{band}</p>
        </MusicTitle>
        <img src={linkinParkImg} alt='Album' />
      </Music>
    </PlayerContainer>
  );
}

export default Player;
