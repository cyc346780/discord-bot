module.exports = {
  name: 'interactionCreate',

  async execute(interaction) {
    if (!interaction.isCommand() && !interaction.isButton()) {
      return;
    }

    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      await interaction.deferReply();

      await interaction.deleteReply();

      await command.execute(interaction);
    }

    if (interaction.isButton()) {
      const button = interaction.client.commands.get(interaction.customId);

      await interaction.deferReply();

      await interaction.deleteReply();

      await button.execute(interaction);
    }
  },
};
