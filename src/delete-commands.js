const { REST, Routes } = require('discord.js');

require('dotenv').config();
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

const rest = new REST().setToken(token);

const logger = require('./logger');

// ...

// for guild-based commands
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => logger.info('Successfully deleted all guild commands.'))
  .catch(logger.error);

// for global commands
rest
  .put(Routes.applicationCommands(clientId), { body: [] })
  .then(() => logger.info('Successfully deleted all application commands.'))
  .catch(logger.error);
