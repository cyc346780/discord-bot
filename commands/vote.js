const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('📊｜發起投票')
    .addStringOption((option) => {
      option
        .setName('題目和選項')
        .setDescription('填入[題目 選項1 選項2 選項3 ...(最多10個選項)]')
        .setRequired(true);

      return option;
    }),

  async execute(interaction) {
    if (interaction.channelId !== interaction.client.VOTE_CHANNEL_ID) {
      await interaction.channel.send({ content: `請至 <#${interaction.client.VOTE_CHANNEL_ID}> 輸入指令` })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    const option = interaction.options.getString('題目和選項');

    if (option.split(' ').length < 3) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription('投票選項至少2個');

      await interaction.channel.send({ content: `📊｜<@${interaction.user.id}> 發起投票`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    if (option.split(' ').length > 11) {
      const embedMsg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle('❌｜錯誤')
        .setDescription('投票選項最多10個');

      await interaction.channel.send({ content: `📊｜<@${interaction.user.id}> 發起投票`, embeds: [embedMsg] })
        .then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });

      return;
    }

    const numberEmoji = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    const question = option.split(' ')[0];

    let optionsList = '';

    for (let i = 1; i < option.split(' ').length; i += 1) {
      optionsList += `${numberEmoji[i]} ${option.split(' ')[i]}\n\n`;
    }

    const embedMsg = new MessageEmbed()
      .setColor('#9B59B6')
      .setTitle(`❓｜${question}`)
      .setDescription(optionsList);

    await interaction.channel.send({ content: `📊｜<@${interaction.user.id}> 發起投票`, embeds: [embedMsg] })
      .then((message) => {
        for (let i = 1; i < option.split(' ').length; i += 1) {
          message.react(numberEmoji[i]);
        }
      });
  },
};
