const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'connectionError',

  async execute(queue) {
    queue.destroy();

    const embedMsg = new MessageEmbed()
      .setColor('#E74C3C')
      .setTitle('❌｜錯誤')
      .setDescription('發生未知錯誤，終止播放');

    await queue.metadata.channel.send({ embeds: [embedMsg] });
  },
};
