const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('🎵｜繼續播放'),

  async execute(interaction) {
    if (interaction.channelId !== interaction.client.MUSIC_CHANNEL_ID) {
      await interaction.channel.send({ content: `請至 <#${interaction.client.MUSIC_CHANNEL_ID}> 輸入指令` })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    if (!interaction.member.voice.channelId) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription('您不在語音頻道中，無法操作');

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 繼續播放`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    if (!interaction.guild.me.voice.channelId) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription(`<@${interaction.guild.me.id}> 不在語音頻道中，無法操作`);

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 繼續播放`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    if (interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription(`您不在 <@${interaction.guild.me.id}> 所在的語音頻道中，無法操作`);

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 繼續播放`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    const { player } = interaction.client;

    const queue = player.getQueue(interaction.guildId);

    if (!queue) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription('查無播放清單，無法操作');

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 繼續播放`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    const isSuccess = queue.setPaused(false);

    if (!isSuccess) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription('沒有歌曲可以被繼續');

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 繼續播放`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

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

    await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 繼續播放`, embeds: [embedMsg], components: [row] });
  },
};
