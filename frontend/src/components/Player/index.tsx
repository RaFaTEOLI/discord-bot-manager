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

// interface PlayerProps {
//   musicName?: string;
//   musicBand?: string;
// }

function Player() {
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
          <p>Numb</p>
          <p>Linkin Park</p>
        </MusicTitle>
        <img src={linkinParkImg} alt='Album' />
      </Music>
    </PlayerContainer>
  );
}

export default Player;
