import { Song } from 'discord-music-player';
import BaseFirebaseRepository from './BaseFirebaseRepository';
import { database } from '../../services/firebase';
import { set, ref } from 'firebase/database';

class QueueRepository extends BaseFirebaseRepository {
  public constructor() {
    super();
    this.db = 'queue';
  }

  public async store(songs: Song[]) {
    if (songs) {
      const queue = songs.map(song => {
        return {
          name: song.name,
          author: song.author,
          duration: song.duration,
          url: song.url,
          thumbnail: song.thumbnail,
        };
      });
      set(ref(database, 'queue'), queue);
    }
  }
}

export default QueueRepository;
