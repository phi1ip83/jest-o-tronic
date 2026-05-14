const fs = require('node:fs');
const path = require('node:path');
const logger = require('../logger');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

//loading commands from files into a collection
client.commands = new Collection();
//grabs the commands folder
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
//cycles through every folder in the commands folder
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  //only grabs js files
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  //cycles through every command file and adds it to the collection if it has a data and execute property
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      logger.error(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  // Only handle slash commands
  if (!interaction.isChatInputCommand()) return;
  // Grabs the command from the collection using the command name from the interaction
  const command = interaction.client.commands.get(interaction.commandName);
  // If the command doesn't exist, log an error and return
  if (!command) {
    logger.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  //attempt to execute the command and catch any errors that occur
  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

// Log in to Discord with your client's token
client.login(token);
