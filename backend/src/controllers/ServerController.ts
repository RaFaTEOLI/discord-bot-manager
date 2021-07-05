require('dotenv').config();
const Discord = require('discord.js');
import { Message } from 'discord.js';

export const baseUrl = 'http://localhost:3000';

class ServerController {
  public async stats(message: Message) {
    const Embed = new Discord.MessageEmbed();
    Embed.setTitle(`Server Stats`);

    Embed.addField(
      'Online Members',
      message.guild.members.cache.filter(
        member => member.presence.guild.available
      ).size
    );
    Embed.addField(
      'Offline Members',
      message.guild.members.cache.filter(
        member => !member.presence.guild.available
      ).size
    );
    message.channel.send(Embed);
  }

  public async users(message: Message) {
    const Embed = new Discord.MessageEmbed();
    Embed.setTitle(`Server Users`);

    message.guild.members.cache.map(member =>
      Embed.addField('-', member.presence.user.username)
    );

    message.channel.send(Embed);
  }

  public async greeting(client: any, member: any) {
    await client.channels.cache
      .get(process.env.SERVER_CHANNEL_ID)
      .send(`Welcome to the server, ${member}`);
  }
}

export default ServerController;
