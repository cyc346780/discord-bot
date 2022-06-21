const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('🎵｜列出播放清單'),

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

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 列出播放清單`, embeds: [embedMsg] })
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

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 列出播放清單`, embeds: [embedMsg] })
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

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 列出播放清單`, embeds: [embedMsg] })
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

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 列出播放清單`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    let playList = '';

    let count = 0;

    let remainSongs = 0;

    queue.tracks.forEach((track) => {
      count += 1;

      if (count <= 10) {
        playList += `**${count}. ${track.title}** - <@${track.requestedBy.id}>\n\n`;
      } else {
        remainSongs += 1;
      }
    });

    const embedMsg = new MessageEmbed()
      .setColor('#3498DB')
      .setTitle('📃｜播放清單')
      .setDescription(count === 0 ? '播放清單中已無歌曲' : playList)
      .setFooter(remainSongs === 0 ? null : `...還有 ${remainSongs} 首歌`);

    await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 列出播放清單`, embeds: [embedMsg] })
      .then((message) => {
        setTimeout(() => {
          message.delete();
        }, 5000);
      });
  },
};
