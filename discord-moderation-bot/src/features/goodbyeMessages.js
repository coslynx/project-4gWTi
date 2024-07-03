const goodbyeMessages = {
  sendGoodbyeMessage: (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
      channel.send(`Goodbye, ${member.displayName}! We'll miss you.`);
    }
  },
};

module.exports = goodbyeMessages;