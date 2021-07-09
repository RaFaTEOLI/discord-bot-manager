import { Request, Response } from 'express';
import { Player } from 'discord-music-player';
import { Message } from 'discord.js';
import MusicRepository from '../repository/MusicRepository';
import QueueRepository from '../repository/QueueRepository';
import music from '../db/music.json';
import queue from '../db/queue.json';
const Discord = require('discord.js');
require('dotenv').config();
class MusicController {
  private musicRepository: MusicRepository;
  private queueRepository: QueueRepository;

  public constructor() {
    this.musicRepository = new MusicRepository(music);
    this.queueRepository = new QueueRepository(queue);
  }

  public async getQueue(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.json(queue[0]);
  }

  public async getSong(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.json(music[0]);
  }

  public async playMusic(message: Message, player: Player, url: string) {
    player.stop(message);
    await player.playlist(message, {
      search: url,
      maxSongs: 400,
    });
  }

  public async execute(message: Message, player: Player, args: Array<string>) {
    try {
      const song = await player.play(message, args.join(' '));

      if (song) {
        this.musicRepository.store(song.name);
        console.log(`Playing ${song.name}`);
        return;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      message.channel.send(error.message);
    }
  }

  public async playing(message: Message, player: Player) {
    if (player.isPlaying(message)) {
      console.log('Queue exists.');
      message.channel.send(
        new Discord.MessageEmbed().setColor('#0099ff').setTitle(`Queue exists.`)
      );
    } else {
      console.log('Queue does not exist.');
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Queue does not exist.`)
      );
    }
  }

  public async addPlaylist(
    message: Message,
    player: Player,
    args: Array<string>
  ) {
    await player.playlist(message, {
      search: args.join(' '),
      maxSongs: -1,
    });
  }

  public async song(player: Player, message: Message) {
    const song = await player.nowPlaying(message);
    if (song) {
      this.musicRepository.store(song.name);
      message.channel.send(`Current song: ${song.name}`);
    }
  }

  public async clearQueue(player: Player, message: Message) {
    const isDone = player.clearQueue(message);
    if (isDone) {
      this.musicRepository.store(null);
      message.channel.send('Queue was cleared!');
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
      message.channel.send(
        'Queue:\n' +
          queue.songs
            .map((song, i) => {
              return `${i === 0 ? 'Now Playing' : `#${i + 1}`} - ${
                song.name
              } | ${song.author}`;
            })
            .join('\n')
      );
    }
  }

  public async skip(player: Player, message: Message) {
    const song = player.skip(message);
    if (song) message.channel.send(`${song.name} was skipped!`);
  }

  public async remove(player: Player, message: Message, args: any) {
    const SongID = parseInt(args[0]) - 1;

    const song = player.remove(message, SongID);
    if (song) {
      message.channel.send(
        `Removed song ${song.name} (${args[0]}) from the Queue!`
      );
    }
  }

  public async stop(player: Player, message: Message) {
    const isDone = player.stop(message);
    if (isDone) {
      this.musicRepository.store(null);
      message.channel.send('Music stopped, the Queue was cleared!');
    }
  }

  public async pause(message: Message, player: Player) {
    const song = player.pause(message);
    if (song) message.channel.send(`${song.name} was paused!`);
  }

  public async resume(message: Message, player: Player) {
    const song = player.resume(message);
    if (song) message.channel.send(`${song.name} was resumed!`);
  }

  public async shuffle(message: Message, player: Player) {
    const songs = player.shuffle(message);
    if (songs) {
      message.channel.send('Server Queue was shuffled.');
    }
  }
}

export default MusicController;
