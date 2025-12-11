//use a proper .env file
require('dotenv').config();
// The Client and Intents are destructured from discord.js, since it exports an object by default. Read up on destructuring here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { Client, IntentsBitField } = require('discord.js');

const prefix = process.env.prefix || '!';
const client = new Client({
  intents: [
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('clientReady', () => {
  console.log('I am ready!');
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content === `${prefix}help`) {
    message.channel.send(`Available commands: ${prefix}ping, ${prefix}help`);
  }

  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send('pong!');
  }
});

client.login(process.env.token);
