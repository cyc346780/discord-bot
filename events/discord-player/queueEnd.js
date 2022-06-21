const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'queueEnd',

  async execute(queue) {
    const embedMsg = new MessageEmbed()
      .setColor('#27AE60')
      .setTitle('✅｜播放完畢');

    await queue.metadata.channel.send({ embeds: [embedMsg] });
  },
};
