import path from 'path';
import fs from 'fs/promises';

class BaseRepository {
  protected name: string;
  protected db: Array<any>;
  protected path: string;
  protected type: any;

  public constructor(name: string, json: Array<any>, type: any = null) {
    this.name = name;
    this.db = json;
    this.path = path.join(__dirname, '../db/');
    this.type = type;
  }

  public async all() {
    if (this.type) {
      const buffer = await fs.readFile(this.path + '/commands.json');
      return JSON.parse(buffer.toString());
    }

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
