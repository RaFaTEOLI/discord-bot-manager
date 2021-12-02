import { Client } from 'discord.js';
import { Player } from 'discord-music-player';
import GameController from './controllers/GameController';
import BotController from './controllers/BotController';
import CommandsController from './controllers/CommandsController';
import ServerController from './controllers/ServerController';
import MusicController from './controllers/MusicController';
import 'dotenv/config';
import MusicRepository from './repository/Firebase/MusicRepository';

const Discord = require('discord.js');

const client = new Client();
const prefix = '!';
const commandsController = new CommandsController();
const botController = new BotController();
const gameController = new GameController();
const serverController = new ServerController();
const musicController = new MusicController();

const botName = process.env.BOT_NAME;

// eslint-disable-next-line no-console
console.log('✅  Bot running...');

const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: true,
  timeout: 0,
  volume: 150,
  quality: 'high',
});

client.on('message', async message => {
  if (message.author.bot && message.author.username !== `${botName} Web`)
    return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody: string = message.content.slice(prefix.length);
  const args: Array<string> = await commandsController.getArgs(commandBody);
  const command: string = args.shift().toLowerCase();

  // eslint-disable-next-line no-console
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
    case 'song':
      await musicController.song(message, player);
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

const musicRepository = new MusicRepository();

player
  // Emitted when channel was empty.
  .on('channelEmpty', message =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('⛔  Empty Channel')
        .setAuthor(
          process.env.BOT_NAME,
          `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
          'https://discord-manager-bot-frontend.herokuapp.com/',
        )
        .setDescription('The channel is empty, I have removed the music'),
    ),
  )
  // Emitted when a song was added to the queue.
  .on('songAdd', (message, queue, song) =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('🎵  New Song Added To The Queue...')
        .setAuthor(
          process.env.BOT_NAME,
          `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
          'https://discord-manager-bot-frontend.herokuapp.com/',
        )
        .setDescription('Song added to the queue')
        .addFields({ name: 'Song Name', value: song.name }),
    ),
  )
  // Emitted when a playlist was added to the queue.
  .on('playlistAdd', (message, queue, playlist) =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('🎵  Playlist Added')
        .setAuthor(
          process.env.BOT_NAME,
          `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
          'https://discord-manager-bot-frontend.herokuapp.com/',
        )
        .setDescription(
          `I just added a playlist with ${playlist.videoCount} songs!`,
        ),
    ),
  )
  // Emitted when there was no more music to play.
  .on('queueEnd', message => {
    musicRepository.store(null);
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('🎵  Queue Ended')
        .setAuthor(
          process.env.BOT_NAME,
          `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
          'https://discord-manager-bot-frontend.herokuapp.com/',
        )
        .setDescription('The queue has ended!'),
    );
  })
  // Emitted when a song changed.
  .on('songChanged', (message, newSong) => {
    musicRepository.store(newSong.name);
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
        .addFields({ name: 'Song', value: newSong.name }),
    );
  })
  // Emitted when a first song in the queue started playing (after play method).
  .on('songFirst', (message, song) => {
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
  })
  // Emitted when someone disconnected the bot from the channel.
  .on('clientDisconnect', message =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('😞  Disconnected')
        .setAuthor(
          process.env.BOT_NAME,
          `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
          'https://discord-manager-bot-frontend.herokuapp.com/',
        )
        .setDescription('I was disconnected!'),
    ),
  )
  // Emitted when deafenOnJoin is true and the bot was undeafened
  .on('clientUndeafen', message =>
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('I was undeafened!'),
    ),
  )
  // Emitted when there was an error with NonAsync functions.
  .on('error', (error, message) => {
    // eslint-disable-next-line no-console
    console.log(`Error: ${error}`);
    let exampleEmbed;
    switch (error) {
      // Thrown when the YouTube search could not find any song with that query.
      case 'SearchIsNull':
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🎵  Song Not Found')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Oops... I cant find this song');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the provided YouTube Playlist could not be found.
      case 'InvalidPlaylist':
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🎵  Playlist Not Found')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Cant find this playlist!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the provided Spotify Song could not be found.
      case 'InvalidSpotify':
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🎵  Song Not Found')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Cant find this song!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the Guild Queue does not exist (no music is playing).
      case 'QueueIsNull':
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('🎵  No Music Playing')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('There is no music playing right now.');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the Members is not in a VoiceChannel.
      case 'VoiceChannelTypeInvalid':
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('You need to be in a voice channel!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the current playing song was an live transmission (that is unsupported).
      case 'LiveUnsupported':
        message.channel.send('We do not support YouTube Livestreams.');
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('We dont support Youtube streams!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the current playing song was unavailable.
      case 'VideoUnavailable':
        message.channel.send(
          'Something went wrong while playing the current song, skipping...',
        );
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Error! Skipping song.');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when provided argument was Not A Number.
      case 'NotANumber':
        message.channel.send('The provided argument was Not A Number.');
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Not a number?');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the first method argument was not a Discord Message object.
      case 'MessageTypeInvalid':
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Not an object!');
        message.channel.send(exampleEmbed);
        break;
      case 'Status code: 410':
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Oops! Resource Unavailable!');
        message.channel.send(exampleEmbed);
        break;
      // Thrown when the Guild Queue does not exist (no music is playing).
      default:
        exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('❌  Unknown Error')
          .setAuthor(
            process.env.BOT_NAME,
            `https://robohash.org/${process.env.BOT_NAME}?gravatar=hashed`,
            'https://discord-manager-bot-frontend.herokuapp.com/',
          )
          .setDescription('Oops! Unknown Error.');
        message.channel.send(exampleEmbed);
        break;
    }
  });

client.login(process.env.TOKEN);
