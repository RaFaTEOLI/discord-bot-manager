import { Request, Response } from 'express';
const Discord = require('discord.js');
import { Message } from 'discord.js';
import BotRepository from '../repository/Firebase/BotRepository';
import CommandsRepository from '../repository/Firebase/CommandsRepository';
import bot from '../db/bot.json';
import types from '../db/types.json';
import { ICommands } from './CommandsController';

export interface IBot {
  name: string;
  description: string;
}

class BotController {
  private bot: Array<IBot>;

  public constructor() {
    this.bot = bot;
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const botRepository = new BotRepository();
    const bot = (await botRepository.all()) as IBot[];
    return response.json([bot]);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const botRepository = new BotRepository();
    const data = await botRepository.findById(id);
    return response.json(data);
  }

  public async me(message: Message) {
    const Embed = new Discord.MessageEmbed();
    Embed.setTitle(this.bot[0].description);

    const commandsRepository = new CommandsRepository();
    const commandsResults = await commandsRepository.findNotInType('music');

    commandsResults.forEach((command: ICommands) => {
      Embed.addField(command.command, command.description);
    });

    message.channel.send(Embed);
  }

  public async playlists(message: Message) {
    const Embed = new Discord.MessageEmbed();
    Embed.setTitle('📀  Playlists').setAuthor(
      process.env.BOT_NAME,
      `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
      'https://discord-manager-bot-frontend.herokuapp.com/',
    );

    const commandsRepository = new CommandsRepository();
    const commandsResults = await commandsRepository.findByType('music');

    commandsResults.forEach((command: ICommands) => {
      Embed.addField(command.command, command.description);
    });

    message.channel.send(Embed);
  }

  public async help(message: Message) {
    const types = await this.getHelpCommand();
    message.reply(
      `Para criar um comando você precisa seguir esse exemplo:
        
!addcommand <[client|message]> <[${types}]> <"command"> <"descrição"> <retorno>
        `,
    );
  }

  public async getHelpCommand() {
    let typesList = '';
    let i = 0;
    types.forEach(type => {
      if (i > 0) {
        typesList += `|${type.name}`;
      } else {
        typesList += `${type.name}`;
      }
      i++;
    });
    return typesList;
  }
}

export default BotController;
