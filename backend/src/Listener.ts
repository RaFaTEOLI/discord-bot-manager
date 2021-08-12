import { Client } from 'discord.js';
import { Player } from 'discord-music-player';
import GameController from './controllers/GameController';
import BotController from './controllers/BotController';
import CommandsController from './controllers/CommandsController';
import ServerController from './controllers/ServerController';
import MusicController from './controllers/MusicController';
import 'dotenv/config';
import MusicRepository from './repository/MusicRepository';
import music from './db/music.json';
const Discord = require('discord.js');

const client = new Client();
const prefix = '!';
const commandsController = new CommandsController();
const botController = new BotController();
const gameController = new GameController();
const serverController = new ServerController();
const musicController = new MusicController();

const botName = process.env.BOT_NAME;

console.log('✅  Bot running...');

client.on('message', async message => {
  if (message.author.bot && message.author.username !== `${botName} Web`)
    return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody: string = message.content.slice(prefix.length);
  const args: Array<string> = await commandsController.getArgs(commandBody);
  const command: string = args.shift().toLowerCase();

  console.log(`Command: ${command}`);
  switch (command) {
    case botName.toLowerCase():
      await botController.me(message);
      break;
    case 'play':
      await musicController.execute(message, player, args);
      break;
    case 'pause':
      await musicController.pause(message, player);
      break;
    case 'resume':
      await musicController.resume(message, player);
      break;
    case 'shuffle':
      await musicController.shuffle(message, player);
      break;
    case 'playing':
      await musicController.playing(message, player);
      break;
    case 'addplaylist':
      await musicController.addPlaylist(message, player, args);
      break;
    case 'queue':
      await musicController.queue(message, player);
      break;
    case 'skip':
      await musicController.skip(player, message);
      break;
    case 'stop':
      await musicController.stop(player, message);
      break;
    case 'playlists':
      await botController.playlists(message);
      break;
    case 'game':
      await gameController.getGame(message);
      break;
    case 'setgame':
      await gameController.setGame(message, args[0]);
      break;
    case 'resetgame':
      await gameController.resetGame(message);
      break;
    case 'wins':
      await gameController.getWins(message);
      break;
    case 'addwin':
      await gameController.setWins(message);
      break;
    case 'resetwins':
      await gameController.resetWins(message);
      break;
    case 'helpcommand':
      await botController.help(message);
      break;
    case 'stats':
      await serverController.stats(message);
      break;
    case 'users':
      await serverController.users(message);
      break;
    case 'addcommand':
      await commandsController.addCommand({
        dispatcher: args[0],
        type: args[1],
        command: args[2],
        description: args[3],
        response: args[4],
        message,
      });
      break;
    default:
      commandsController.executeCommand({ message, player, command });
  }
});

client.on('guildMemberAdd', async member => {
  serverController.greeting(client, member);
});

client.on('ready', () => {
  client.user.setActivity('vocês falarem merda', { type: 'WATCHING' });
});

const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: true,
  timeout: 0,
  volume: 150,
  quality: 'high',
});

const musicRepository = new MusicRepository(music);

player
  // Emitted when channel was empty.
  .on('channelEmpty', (message, queue) =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`The channel is empty, I have removed the music`)
    )
  )
  // Emitted when a song was added to the queue.
  .on('songAdd', (message, queue, song) =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(song.name + ' has been added to the queue')
    )
  )
  // Emitted when a playlist was added to the queue.
  .on('playlistAdd', (message, queue, playlist) =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`I just added a playlist with ${playlist.videoCount} songs!`)
    )
  )
  // Emitted when there was no more music to play.
  .on('queueEnd', (message, queue) => {
    musicRepository.store(null);
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('The queue has ended!')
    );
  })
  // Emitted when a song changed.
  .on('songChanged', (message, newSong, oldSong) => {
    musicRepository.store(newSong.name);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(newSong.name + ' is now playing!')
    );
  })
  // Emitted when a first song in the queue started playing (after play method).
  .on('songFirst', (message, song) => {
    musicRepository.store(song.name);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(song.name + ' is now playing!')
    );
  })
  // Emitted when someone disconnected the bot from the channel.
  .on('clientDisconnect', (message, queue) =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('I was disconnected!')
    )
  )
  // Emitted when deafenOnJoin is true and the bot was undeafened
  .on('clientUndeafen', (message, queue) =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('I was undeafened!')
    )
  )
  // Emitted when there was an error with NonAsync functions.
  .on('error', (error, message) => {
    console.log(`Error: ${error}`);
    switch (error) {
      // Thrown when the YouTube search could not find any song with that query.
      case 'SearchIsNull':
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Oops... I cant find this song');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the provided YouTube Playlist could not be found.
      case 'InvalidPlaylist':
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Cant find this playlist!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the provided Spotify Song could not be found.
      case 'InvalidSpotify':
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Cant find this song!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the Guild Queue does not exist (no music is playing).
      case 'QueueIsNull':
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('There is no music playing right now.');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the Members is not in a VoiceChannel.
      case 'VoiceChannelTypeInvalid':
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('You need to be in a voice channel!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the current playing song was an live transmission (that is unsupported).
      case 'LiveUnsupported':
        message.channel.send(`We do not support YouTube Livestreams.`);
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('We dont support Youtube streams!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the current playing song was unavailable.
      case 'VideoUnavailable':
        message.channel.send(
          `Something went wrong while playing the current song, skipping...`
        );
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Error! Skipping song.');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when provided argument was Not A Number.
      case 'NotANumber':
        message.channel.send(`The provided argument was Not A Number.`);
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Not a number?');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the first method argument was not a Discord Message object.
      case 'MessageTypeInvalid':
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Not an object!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the Guild Queue does not exist (no music is playing).
      default:
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Oops! Unknown Error.');
        message.channel.send(exampleEmbed);
        break;
    }
  });

client.login(process.env.TOKEN);
