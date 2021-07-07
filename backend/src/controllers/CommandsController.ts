import { Request, Response } from 'express';
import { Message, Client } from 'discord.js';
import MusicController from './MusicController';
import MessageController from './MessageController';
import { baseUrl } from './ServerController';
import { IBot } from './BotController';
import CommandsRepository from '../repository/CommandsRepository';
import commands from '../db/commands.json';
import bot from '../db/bot.json';

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
  public async index(request: Request, response: Response): Promise<Response> {
    const commandsRepository = new CommandsRepository(commands);
    const { command } = request.query;
    if (command) {
      return response.json(await commandsRepository.findByCommand(command));
    } else {
      return response.json(await commandsRepository.all());
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const commandsRepository = new CommandsRepository(commands);
    const data = await commandsRepository.findById(id);
    return response.json(data);
  }

  public async store(request: Request, _response: Response): Promise<Response> {
    const commandsRepository = new CommandsRepository(commands);
    const { command, description, dispatcher, type, response } = request.body;
    const data = await commandsRepository.store({
      command,
      description,
      dispatcher,
      type,
      response,
    });
    return _response.json(data);
  }

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
    const commandsRepository = new CommandsRepository(commands);

    const cmdObj = await commandsRepository.findByCommand(command);

    if (!cmdObj) {
      message.reply(`Comando não encontrado, tente !${bot[0].name}.`);
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
        message.reply(`Comando não encontrado, tente !${bot[0].name}.`);
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
      const commandsRepository = new CommandsRepository(commands);
      await commandsRepository.store({
        command: `!${command}`,
        description,
        dispatcher,
        type,
        response,
      });

      message.reply(`Comando criado com sucesso!`);
    } catch (err) {
      message.reply(`Erro ao criar comando`);
    }
  }
}

export default CommandsController;
