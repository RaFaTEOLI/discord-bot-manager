import BaseFirebaseRepository from './BaseFirebaseRepository';

class TestRepository extends BaseFirebaseRepository {
  public constructor() {
    super();
    this.db = 'test';
  }
}

export default TestRepository;
