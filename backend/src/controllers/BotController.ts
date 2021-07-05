import axios from 'axios';
const Discord = require('discord.js');
import { ICommands } from './CommandsController';
import { Message } from 'discord.js';
import { baseUrl } from './ServerController';

interface ITypes {
  name: string;
}

export interface IBot {
  name: string;
  description: string;
}

class BotController {
  public async me(message: Message) {
    const response = await axios.get<IBot>(`${baseUrl}/bot`);
    const bot = response.data;

    //     message.reply(
    //       `${bot.description}

    // Lista de comandos:

    // ${await this.getDescription()}
    //         `
    //     );
    const Embed = new Discord.MessageEmbed();
    Embed.setTitle(bot.description);

    const botCommands = await axios.get<ICommands[]>(`${baseUrl}/commands`);

    botCommands.data.forEach(command => {
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

  // public async getDescription() {
  //   const botCommands = await axios.get<ICommands[]>(`${baseUrl}/commands`);
  //   let commandList = '';
  //   botCommands.data.forEach(command => {
  //     commandList += `${command.command} - ${command.description}\n`;
  //   });
  //   return commandList;
  // }

  public async getHelpCommand() {
    const types = await axios.get<ITypes[]>(`${baseUrl}/types`);
    let typesList = '';
    let i = 0;
    types.data.forEach(type => {
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
