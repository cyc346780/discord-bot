const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Player } = require('discord-player');
const config = require('./config.json');

const TOKEN = process.env.TOKEN || config.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID || config.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID || config.GUILD_ID;
const VOTE_CHANNEL_ID = process.env.VOTE_CHANNEL_ID || config.VOTE_CHANNEL_ID;
const MUSIC_CHANNEL_ID = process.env.MUSIC_CHANNEL_ID || config.MUSIC_CHANNEL_ID;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
});

client.player = player;
client.VOTE_CHANNEL_ID = VOTE_CHANNEL_ID;
client.MUSIC_CHANNEL_ID = MUSIC_CHANNEL_ID;
client.commands = new Collection();

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);

  commands.push(command.data.toJSON());
});

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands },
  );
})();

const discordJsEventFiles = fs.readdirSync('./events/discord.js').filter((file) => file.endsWith('.js'));

discordJsEventFiles.forEach((file) => {
  const event = require(`./events/discord.js/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

const discordPlayerEventFiles = fs.readdirSync('./events/discord-player').filter((file) => file.endsWith('.js'));

discordPlayerEventFiles.forEach((file) => {
  const event = require(`./events/discord-player/${file}`);

  if (event.once) {
    player.once(event.name, (...args) => event.execute(...args));
  } else {
    player.on(event.name, (...args) => event.execute(...args));
  }
});

client.login(TOKEN);
