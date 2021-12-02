import BaseFirebaseRepository from './BaseFirebaseRepository';

class TypesRepository extends BaseFirebaseRepository {
  public constructor() {
    super();
    this.db = 'types';
  }
}

export default TypesRepository;
