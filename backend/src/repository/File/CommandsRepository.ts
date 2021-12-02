import fs from 'fs/promises';

import { ICommands } from '../../controllers/CommandsController';
import BaseRepository from './BaseRepository';

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
  public async update({
    id,
    command,
    dispatcher,
    type,
    description,
    response,
  }: ICommands) {
    this.db.forEach(row => {
      if (row.id == id) {
        row.command = command;
        row.dispatcher = dispatcher;
        row.type = type;
        row.description = description;
        row.response = response;
      }
    });
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
  public async destroy(id: string) {
    const result = this.db.filter(obj => {
      return obj.id != id;
    });
    this.db = result;
    await fs.writeFile(this.path + '/commands.json', JSON.stringify(result), {
      encoding: 'utf8',
    });
    return;
  }
  public async findByType(type: string) {
    if (this.type) {
      const buffer = await fs.readFile(this.path + '/commands.json');
      return JSON.parse(buffer.toString()).filter(
        (obj: ICommands) => obj.type == type,
      );
    }
    return this.db.filter((obj: ICommands) => obj.type == type);
  }
  public async findNotInType(type: string) {
    if (this.type) {
      const buffer = await fs.readFile(this.path + '/commands.json');
      return JSON.parse(buffer.toString()).filter(
        (obj: ICommands) => obj.type != type,
      );
    }
    return this.db.filter((obj: ICommands) => obj.type != type);
  }
}

export default CommandsRepository;
