import BaseRepository from './BaseRepository';

import fs from 'fs/promises';

interface Item {
  id: string;
  name: string;
  artist: string;
  albumImage?: string;
}

class MusicRepository extends BaseRepository {
  public async store(song: String | null): Promise<void> {
    if (song) {
      const songName = song
        .split('-')[0]
        ?.replace('[Official Music Video]', '')
        .trimEnd();
      const bandName = song.split('-')[1]?.trimStart().trimEnd();

      this.db[0].name = songName;
      this.db[0].artist = bandName;
      this.db[0].albumImage = null;
    } else {
      this.db[0].name = 'Not Playing';
      this.db[0].artist = null;
      this.db[0].albumImage = null;
    }

    if (this.db) {
      console.log('Writing new file:', JSON.stringify(this.db));
      await fs.writeFile(this.path + '/music.json', JSON.stringify(this.db), {
        encoding: 'utf8',
      });
    }
    console.log('DB:', this.db);
    return this.db[0];
  }
}

export default MusicRepository;
