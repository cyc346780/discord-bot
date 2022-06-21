const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'trackStart',

  async execute(queue) {
    const embedMsg = new MessageEmbed()
      .setColor('#27AE60')
      .setTitle('▶️｜現在播放')
      .setDescription(`[${queue.current.title}](${queue.current.url})`)
      .setThumbnail(queue.current.thumbnail)
      .setFooter({ text: `由 ${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator} 新增` });

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('pause')
          .setLabel('暫停')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('skip')
          .setLabel('跳下一首')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('stop')
          .setLabel('中止')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId('list')
          .setLabel('播放清單')
          .setStyle('SECONDARY'),
      );

    await queue.metadata.channel.send({ embeds: [embedMsg], components: [row] });
  },
};
