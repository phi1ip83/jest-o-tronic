const { SlashCommandBuilder } = require('discord.js');
const logger = require('../../logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),

  async execute(interaction) {
    logger.info('Server command invoked by: ' + interaction.user.username);
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
    );
  },
};
