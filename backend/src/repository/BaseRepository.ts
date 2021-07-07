import path from 'path';

class BaseRepository {
  protected db: Array<any>;
  protected path: string;

  public constructor(json: Array<any>) {
    this.db = json;
    this.path = path.join(__dirname, '../db/');
  }

  public async all() {
    return this.db;
  }

  public async findById(id: string) {
    const result = this.db.filter(obj => obj.id == id);
    if (result.length) {
      return result[0];
    } else {
      return {};
    }
  }
}

export default BaseRepository;
