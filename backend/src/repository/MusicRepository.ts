import BaseRepository from './BaseRepository';

import fs from 'fs/promises';

class MusicRepository extends BaseRepository {
  public async store(song: String | null) {
    this.db[0].currentSong = song;
    await fs.writeFile(this.path + '/music.json', JSON.stringify(this.db), {
      encoding: 'utf8',
    });
    console.log(this.db);
    return this.db[0];
  }
}

export default MusicRepository;
