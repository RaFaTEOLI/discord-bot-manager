import BaseFirebaseRepository from './BaseFirebaseRepository';
import { database } from '../../services/firebase';
import { ref, get, child } from 'firebase/database';

class BotRepository extends BaseFirebaseRepository {
  public constructor() {
    super();
    this.db = 'bot';
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

export default BotRepository;
