import { Request, Response } from 'express';
import { Player } from 'discord-music-player';
import { Message } from 'discord.js';
import MusicRepository from '../repository/Firebase/MusicRepository';
import QueueRepository from '../repository/Firebase/QueueRepository';
const Discord = require('discord.js');
require('dotenv').config();

interface IMusic {
  id: string;
  name: string;
  artist: string;
  albumImage: string;
}

class MusicController {
  public async getQueue(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const queueRepository = new QueueRepository();
    const queue = await queueRepository.all();
    return response.json(queue);
  }

  public async getSong(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const musicRepository = new MusicRepository();
    const music = (await musicRepository.all()) as IMusic[];
    return response.json(music);
  }

  public async playMusic(message: Message, player: Player, url: string) {
    player.stop(message);
    console.log({
      action: 'playMusic',
      url,
    });
    await player.playlist(message, {
      search: url,
      maxSongs: -1,
      shuffle: true,
    });
  }

  public async execute(message: Message, player: Player, args: Array<string>) {
    try {
      const song = await player.play(message, args.join(' '));

      if (song) {
        const musicRepository = new MusicRepository();
        musicRepository.store(song.name);
        console.log(`Playing ${song.name}`);
        return;
      }
    } catch (error: any) {
      console.log(`Error: ${error}`);
      message.channel.send(error.message);
    }
  }

  public async playing(message: Message, player: Player) {
    if (player.isPlaying(message)) {
      console.log('Queue exists.');
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🎶  Queue Exists')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          ),
      );
    } else {
      console.log('Queue does not exist.');
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🙅  Queue Does Not Exists')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          ),
      );
    }
  }

  public async addPlaylist(
    message: Message,
    player: Player,
    args: Array<string>,
  ) {
    await player.playlist(message, {
      search: args.join(' '),
      maxSongs: 500,
    });
  }

  public async song(message: Message, player: Player) {
    const song = await player.nowPlaying(message);
    if (song) {
      const musicRepository = new MusicRepository();
      musicRepository.store(song.name);
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🎵  Now Playing')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('')
          .addFields({ name: 'Song', value: song.name }),
      );
    }
  }

  public async clearQueue(player: Player, message: Message) {
    const isDone = player.clearQueue(message);
    if (isDone) {
      const musicRepository = new MusicRepository();
      musicRepository.store(null);
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🗑️  Queue Cleared')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Queue was cleared!'),
      );
    }
  }

  // public async seek(player: Player, message: Message, args: any) {
  //   const song = await player
  //     .seek(message, parseInt(args[0] * 1000))
  //     .catch(err => {
  //       return message.channel.send(err.message);
  //     });

  //   message.channel.send(`Seeked to ${args[0]} second of ${song.name}.`);
  // }

  public async queue(message: Message, player: Player) {
    const queue = player.getQueue(message);

    if (queue) {
      const queueRepository = new QueueRepository();
      await queueRepository.store(queue.songs);
      const Embed = new Discord.MessageEmbed();
      Embed.setTitle('🎵  Queue').setAuthor(
        process.env.BOT_NAME,
        `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
        'https://discord-manager-bot-frontend.herokuapp.com/',
      );

      queue.songs.forEach((song, i) => {
        const songOrder = i + 1;
        if (songOrder < 11) {
          if (songOrder == 1) {
            Embed.addField(
              `▶️  #${songOrder}`,
              `${song.name} - ${song.author}`,
            );
          } else {
            Embed.addField(
              `⏭️  #${songOrder}`,
              `${song.name} - ${song.author}`,
            );
          }
        }
      });

      if (queue.songs.length > 10) {
        Embed.setDescription('Showing next 10 songs in the queue...');
      }

      message.channel.send(Embed);
    }
  }

  public async skip(player: Player, message: Message) {
    const song = player.skip(message);
    if (song)
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('⏭️  Song Skipped')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Song was skipped')
          .addFields({ name: 'Song', value: song.name }),
      );
  }

  public async remove(player: Player, message: Message, args: any) {
    const SongID = parseInt(args[0]) - 1;

    const song = player.remove(message, SongID);
    if (song) {
      message.channel.send(
        `Removed song ${song.name} (${args[0]}) from the Queue!`,
      );
    }
  }

  public async stop(player: Player, message: Message) {
    const isDone = player.stop(message);
    if (isDone) {
      const musicRepository = new MusicRepository();
      musicRepository.store(null);
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🗑️  Queue Cleared')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Music stopped, the Queue was cleared!'),
      );
    }
  }

  public async pause(message: Message, player: Player) {
    const song = player.pause(message);
    if (song)
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('⏸️  Song Paused')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('')
          .addFields({ name: 'Song', value: song.name }),
      );
  }

  public async resume(message: Message, player: Player) {
    const song = player.resume(message);
    if (song)
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('⏯️  Song Resumed')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('The song was paused')
          .addFields({ name: 'Song', value: song.name }),
      );
  }

  public async shuffle(message: Message, player: Player) {
    const songs = player.shuffle(message);
    if (songs) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🔀  Server Queue Shuffled')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Server Queue was shuffled.'),
      );
    }
  }
}

export default MusicController;
