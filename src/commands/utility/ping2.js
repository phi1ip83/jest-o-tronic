const { SlashCommandBuilder } = require('discord.js');
const logger = require('../../logger');

module.exports = {
  data: new SlashCommandBuilder().setName('ping2').setDescription('Replies with Pong2!'),

  async execute(interaction) {
    logger.info('Ping2 command invoked by: ' + interaction.user.username);

    await interaction.reply('Pong2!');
  },
};
