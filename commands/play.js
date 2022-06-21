const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('🎵｜新增歌曲/歌單')
    .addStringOption((option) => {
      option
        .setName('網址')
        .setDescription('填入[歌曲/歌單的網址]')
        .setRequired(true);

      return option;
    }),

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

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 新增歌曲/歌單`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    if (interaction.guild.me.voice.channelId
      && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription(`您不在 <@${interaction.guild.me.id}> 所在的語音頻道中，無法操作`);

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 新增歌曲/歌單`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    const { player } = interaction.client;

    const queue = player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
    });

    if (!queue.connection) {
      try {
        await queue.connect(interaction.member.voice.channel);
      } catch {
        const embedMsg = new MessageEmbed()
          .setColor('#E74C3C')
          .setTitle('❌｜錯誤')
          .setDescription(`<@${interaction.guild.me.id}> 無法加入語音頻道`);

        await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 新增歌曲/歌單`, embeds: [embedMsg] })
          .then((message) => {
            setTimeout(() => {
              message.delete();
            }, 5000);
          });

        return;
      }
    }

    const option = interaction.options.getString('網址');

    const searchResult = await player.search(option, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (!searchResult || !searchResult.tracks.length) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription('查無歌曲/歌單');

      await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 新增歌曲/歌單`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    const embedMsg = new MessageEmbed()
      .setColor('#2ECC71')
      .setTitle(searchResult.playlist ? '🆕｜成功將歌單加入播放清單' : '🆕｜成功將歌曲加入播放清單')
      .setDescription(searchResult.playlist ? `[${searchResult.playlist.title}](${searchResult.playlist.url})` : `[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})`)
      .setThumbnail(searchResult.playlist ? searchResult.playlist.thumbnail : searchResult.tracks[0].thumbnail)
      .setFooter({ text: `由 ${interaction.user.username}#${interaction.user.discriminator} 新增` });

    await interaction.channel.send({ content: `🎵｜<@${interaction.user.id}> 新增歌曲/歌單`, embeds: [embedMsg] })
      .then((message) => {
        setTimeout(() => {
          message.delete();
        }, 5000);
      });

    if (searchResult.playlist) {
      queue.addTracks(searchResult.tracks);
    } else {
      queue.addTrack(searchResult.tracks[0]);
    }

    if (!queue.playing) {
      await queue.play();
    }
  },
};
