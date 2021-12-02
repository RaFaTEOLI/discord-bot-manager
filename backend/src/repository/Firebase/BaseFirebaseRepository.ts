import { database } from '../../services/firebase';
import { set, ref, get, child, push, remove } from 'firebase/database';

class BaseFirebaseRepository {
  protected db: string;

  public async store(payload: any) {
    try {
      push(ref(database, this.db), payload);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async update(id: string, payload: any) {
    set(ref(database, `${this.db}/${id}`), payload);
  }

  public async all() {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `${this.db}`));
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(entry => {
        const obj = Object.assign({}, entry[1]);
        return {
          id: entry[0],
          ...obj,
        };
      });
    } else {
      return [];
    }
  }

  public async findById(id: string) {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `${this.db}/${id}`));
    if (snapshot.exists()) {
      const obj = snapshot.val();
      return {
        id,
        ...obj,
      };
    } else {
      return [];
    }
  }

  public async destroy(id: string) {
    const dbRef = ref(database);
    await remove(child(dbRef, `${this.db}/${id}`));
  }
}

export default BaseFirebaseRepository;
