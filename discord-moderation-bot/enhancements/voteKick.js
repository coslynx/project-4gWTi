const Discord = require('discord.js');

module.exports = {
  name: 'voteKick',
  description: 'Initiate a vote kick process for problematic users',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to initiate a vote kick.');
    }

    const targetUser = message.mentions.users.first();
    if (!targetUser) {
      return message.reply('Please mention the user you want to kick.');
    }

    const voteKickEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Vote Kick Initiated')
      .setDescription(`Initiating a vote kick for ${targetUser}.\nReact with 👍 to kick, or 👎 to cancel.`);

    message.channel.send(voteKickEmbed)
      .then((voteMessage) => {
        voteMessage.react('👍');
        voteMessage.react('👎');

        const filter = (reaction, user) => {
          return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        voteMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
          .then((collected) => {
            const reaction = collected.first();

            if (reaction.emoji.name === '👍') {
              // Kick the user
              message.channel.send(`Successfully kicked ${targetUser}`);
              targetUser.kick();
            } else {
              message.channel.send('Vote kick canceled.');
            }
          })
          .catch(() => {
            message.channel.send('Vote kick timed out.');
          });
      });
  },
};