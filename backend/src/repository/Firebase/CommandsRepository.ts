import { ICommands } from '../../controllers/CommandsController';
import BaseFirebaseRepository from './BaseFirebaseRepository';

class CommandsRepository extends BaseFirebaseRepository {
  public constructor() {
    super();
    this.db = 'commands';
  }

  public async findByCommand(commandToCheck: any) {
    const commands = await this.all();
    const result = commands.filter(
      (command: any) => command.command == `!${commandToCheck}`,
    );
    if (result.length) {
      return result[0];
    } else {
      return {};
    }
  }
  public async findByType(type: string) {
    const commands = (await this.all()) as ICommands[];
    return commands.filter((obj: ICommands) => obj.type == type);
  }
  public async findNotInType(type: string) {
    const commands = (await this.all()) as ICommands[];
    return commands.filter((obj: ICommands) => obj.type != type);
  }
}

export default CommandsRepository;
