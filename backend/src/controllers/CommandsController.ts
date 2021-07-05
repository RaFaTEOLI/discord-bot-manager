import { Message, Client } from 'discord.js';
import axios from 'axios';
import MusicController from './MusicController';
import MessageController from './MessageController';
import { baseUrl } from './ServerController';
import { IBot } from './BotController';

export interface ICommands {
  id?: number;
  command: string;
  dispatcher: string;
  type: string;
  description: string;
  response?: string | null;
  message?: any;
}

export interface ICommand {
  message: Message;
  client: Client;
  command: string;
}

class CommandsController {
  public async getArgs(command: string) {
    const semiArgs = command.split('"');
    const fullArgs = semiArgs[0].split(' ');
    if (semiArgs.length > 1) {
      fullArgs.pop();
      if (semiArgs[1]) {
        fullArgs.push(semiArgs[1]);
      }
      if (semiArgs[2]) {
        fullArgs.push(semiArgs[2].trim());
      }
    }
    return fullArgs;
  }

  public async executeCommand({ message, client, command }: ICommand) {
    const musicController = new MusicController();
    const messageController = new MessageController();

    const botResponse = await axios.get<IBot>(`${baseUrl}/bot`);
    const bot = botResponse.data;

    const response = await axios.get<ICommands[]>(
      `${baseUrl}/commands?command=!${command}`
    );

    const cmdObj = response.data[0];

    if (!cmdObj) {
      message.reply(`Comando não encontrado, tente !${bot.name}.`);
      return;
    }

    switch (cmdObj.type) {
      case 'music':
        await musicController.playMusic({ client, url: cmdObj.response });
        break;
      case 'message':
        await messageController.sendMessage({ message, text: cmdObj.response });
        break;
      default:
        message.reply(`Comando não encontrado, tente !${bot.name}.`);
    }
  }

  public async addCommand({
    command,
    dispatcher,
    type,
    description,
    response,
    message,
  }: ICommands) {
    try {
      await axios.post(`${baseUrl}/commands`, {
        command: `!${command}`,
        dispatcher,
        type,
        description,
        response,
      });

      message.reply(`Comando criado com sucesso!`);
    } catch (err) {
      message.reply(`Erro ao criar comando`);
    }
  }
}

export default CommandsController;
