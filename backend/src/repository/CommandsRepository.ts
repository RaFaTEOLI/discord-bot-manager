import BaseRepository from './BaseRepository';
import fs from 'fs/promises';

import { ICommands } from '../controllers/CommandsController';

class CommandsRepository extends BaseRepository {
  public async store({
    command,
    dispatcher,
    type,
    description,
    response,
  }: ICommands) {
    const id = this.db[this.db.length - 1].id + 1;
    this.db.push({ id, command, dispatcher, type, description, response });
    await fs.writeFile(this.path + '/commands.json', JSON.stringify(this.db), {
      encoding: 'utf8',
    });
    return { id, command, dispatcher, type, description, response };
  }

  public async findByCommand(command: any) {
    const result = this.db.filter(obj => obj.command == `!${command}`);
    if (result.length) {
      return result[0];
    } else {
      return {};
    }
  }
}

export default CommandsRepository;
