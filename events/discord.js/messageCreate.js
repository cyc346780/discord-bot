module.exports = {
  name: 'messageCreate',

  async execute(message) {
    if (message.channelId === message.client.VOTE_CHANNEL_ID
      || message.channelId === message.client.MUSIC_CHANNEL_ID) {
      if (message.member.id === message.guild.me.id) {
        return;
      } else {
        await message.delete();
      }
    }
  },
};
