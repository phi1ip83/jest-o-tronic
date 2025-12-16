const { SlashCommandBuilder } = require('discord.js');
const logger = require('../../logger');

module.exports = {
  data: new SlashCommandBuilder().setName('event').setDescription('creates a server event'),

  async execute(interaction) {
    logger.info('Event command invoked by: ' + interaction.user.username);

    let time1 = new Date(interaction.createdTimestamp);
    logger.info(time1.getHours() + ':' + time1.getMinutes());
    logger.info(time1.getTimezoneOffset() / 60);

    await interaction.reply('event! ');
  },
};
