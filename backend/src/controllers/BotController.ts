import { Request, Response } from 'express';
const Discord = require('discord.js');
import { Message } from 'discord.js';
import BotRepository from '../repository/BotRepository';
import bot from '../db/bot.json';
import commands from '../db/commands.json';
import types from '../db/types.json';

interface ITypes {
  name: string;
}

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
    const botRepository = new BotRepository(bot);
    return response.json(await botRepository.all());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const botRepository = new BotRepository(bot);
    const data = await botRepository.findById(id);
    return response.json(data);
  }

  public async me(message: Message) {
    const Embed = new Discord.MessageEmbed();
    Embed.setTitle(this.bot[0].description);

    commands.forEach(command => {
      Embed.addField(command.command, command.description);
    });

    message.channel.send(Embed);
  }

  public async help(message: Message) {
    const types = await this.getHelpCommand();
    message.reply(
      `Para criar um comando você precisa seguir esse exemplo:
        
!addcommand <[client|message]> <[${types}]> <"command"> <"descrição"> <retorno>
        `
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
