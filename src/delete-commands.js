//deletes commands from all servers and specific servers.
const logger = require('../logger');
const { REST, Routes } = require('discord.js');
const clientId = process.env.CLIENT_ID,
  guildId = process.env.GUILD_ID,
  token = process.env.TOKEN;

const rest = new REST().setToken(token);

// ...

// for guild-based commands
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => logger.info('Successfully deleted all guild commands.'))
  .catch((error) => logger.error(error));

// for global commands
rest
  .put(Routes.applicationCommands(clientId), { body: [] })
  .then(() => logger.info('Successfully deleted all application commands.'))
  .catch((error) => logger.error(error));
