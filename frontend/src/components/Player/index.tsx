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
import emptyAlbumImg from '../../assets/emptyAlbum.png';
interface PlayerProps {
  name?: string;
  artist?: string;
  albumImage?: string;
}

function Player({ name, artist, albumImage }: PlayerProps) {
  return (
    <PlayerContainer>
      <Playing>
        <img src={musicImg} alt='Music' />
        <p>Now Playing...</p>
      </Playing>
      <Controls>
        {/* <img src={goBackImg} alt='Go Back' />
        <img src={pauseImg} alt='Pause' />
        <img src={skipImg} alt='Skip' /> */}
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
