import BaseFirebaseRepository from './BaseFirebaseRepository';
import { database } from '../../services/firebase';
import { set, ref, get, child } from 'firebase/database';

interface Item {
  id: string;
  name: string;
  artist: string;
  albumImage?: string;
}

class MusicRepository extends BaseFirebaseRepository {
  public constructor() {
    super();
    this.db = 'music';
  }

  public async store(song: String | null): Promise<void> {
    const music: Item = {
      id: '2nLtzopw4rPReszdYBJU6h',
      name: 'Not Playing',
      artist: null,
      albumImage: null,
    };
    if (song) {
      const songName = song
        .split('-')[0]
        ?.replace('[Official Music Video]', '')
        .trimEnd();
      const bandName = song.split('-')[1]?.trimStart().trimEnd();

      music.name = songName;
      music.artist = bandName;
      music.albumImage = null;
    }
    set(ref(database, 'music'), music);
  }
  public async all() {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `${this.db}`));
    if (snapshot.exists()) {
      const obj = Object.assign({}, snapshot.val());
      return obj;
    } else {
      return [];
    }
  }
}

export default MusicRepository;
