import BaseRepository from './BaseRepository';

import fs from 'fs/promises';
import SpotifyController from '../controllers/SpotifyController';

interface Item {
  id: string;
  name: string;
  artist: string;
  albumImage?: string;
}

class MusicRepository extends BaseRepository {
  public async store(song: String | null) {
    if (song) {
      const songName = song
        .split('-')[0]
        ?.replace('[Official Music Video]', '')
        .trimEnd();
      const bandName = song.split('-')[1]?.trimStart().trimEnd();

      // const spotifyController = new SpotifyController();
      // const spotifyItem = await spotifyController.getItem(songName, bandName);
      // const albumImage = await spotifyController.getTrack(spotifyItem.id);

      // this.db[0] = {
      //   ...spotifyItem,
      //   albumImage,
      // };
      this.db[0].name = songName;
      this.db[0].artist = bandName;
      this.db[0].albumImage = null;
    }

    await fs.writeFile(this.path + '/music.json', JSON.stringify(this.db), {
      encoding: 'utf8',
    });
    console.log('DB:', this.db);
    return this.db[0];
  }
}

export default MusicRepository;
