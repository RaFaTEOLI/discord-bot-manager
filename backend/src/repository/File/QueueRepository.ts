import { Song } from 'discord-music-player';
import fs from 'fs/promises';
import BaseRepository from './BaseRepository';
class QueueRepository extends BaseRepository {
  public async store(songs: Song[]) {
    console.log('QueueRepository:', songs);
    if (songs) {
      this.db = songs.map(song => {
        return {
          name: song.name,
          author: song.author,
          duration: song.duration,
          url: song.url,
          thumbnail: song.thumbnail,
        };
      });
      await fs.writeFile(this.path + '/queue.json', JSON.stringify(this.db), {
        encoding: 'utf8',
      });
    }
  }
}

export default QueueRepository;
