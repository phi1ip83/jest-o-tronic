const { SlashCommandBuilder } = require('discord.js');
const logger = require('../../logger');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  async execute(interaction) {
    logger.info('Ping command invoked by: ' + interaction.user.username);

    await interaction.reply('Pong!');
  },
};
