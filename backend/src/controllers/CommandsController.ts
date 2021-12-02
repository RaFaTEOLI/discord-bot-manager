import { Request, Response } from 'express';
import { Message } from 'discord.js';
import MusicController from './MusicController';
import MessageController from './MessageController';
import CommandsRepository from '../repository/Firebase/CommandsRepository';
import bot from '../db/bot.json';
import { Player } from 'discord-music-player';

export interface ICommands {
  id?: number | string;
  command: string;
  dispatcher: string;
  type: string;
  description: string;
  response?: string | null;
  message?: any;
}

export interface ICommand {
  message: Message;
  player: Player;
  command: string;
  type?: string;
  response?: string;
}

class CommandsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { command } = request.query;
    const commandsRepository = new CommandsRepository();
    if (command) {
      return response.json(await commandsRepository.findByCommand(command));
    } else {
      return response.json(await commandsRepository.all());
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const commandsRepository = new CommandsRepository();
    const data = await commandsRepository.findById(id);
    return response.json(data);
  }

  public async store(request: Request, _response: Response): Promise<Response> {
    const { command, description, dispatcher, type, response } = request.body;
    const commandsRepository = new CommandsRepository();
    return _response.status(204).json(
      await commandsRepository.store({
        command: `!${command}`,
        description,
        dispatcher,
        type,
        response,
      }),
    );
  }

  public async update(
    request: Request,
    _response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { command, description, dispatcher, type, response } = request.body;
    const commandsRepository = new CommandsRepository();
    return _response.status(204).json(
      await commandsRepository.update(id, {
        command: `!${command}`,
        description,
        dispatcher,
        type,
        response,
      }),
    );
  }

  public async destroy(
    request: Request,
    _response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const commandsRepository = new CommandsRepository();
    const data = await commandsRepository.destroy(id);
    return _response.status(204).json(data);
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

  public async executeCommand({ message, player, command }: ICommand) {
    const musicController = new MusicController();
    const messageController = new MessageController();
    const commandsRepository = new CommandsRepository();

    const cmdObj = (await commandsRepository.findByCommand(
      command,
    )) as ICommand;

    if (!cmdObj) {
      message.reply(`Comando não encontrado, tente !${bot[0].name}.`);
      return;
    }

    switch (cmdObj.type) {
      case 'music':
        await musicController.playMusic(message, player, cmdObj.response);
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
      const commandsRepository = new CommandsRepository();
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
