const Discord = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Unmute a user in the server',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      return message.reply('You do not have permission to unmute users.');
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.reply('Please mention the user you want to unmute.');
    }

    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
      return message.reply('Mute role not found. Please create a "Muted" role.');
    }

    const member = message.guild.members.cache.get(target.id);
    if (!member) {
      return message.reply('User not found in the server.');
    }

    if (!member.roles.cache.has(muteRole.id)) {
      return message.reply('User is not muted.');
    }

    member.roles.remove(muteRole)
      .then(() => {
        message.channel.send(`${target} has been unmuted.`);
      })
      .catch(error => {
        console.error('Error unmuting user:', error);
        message.reply('There was an error unmuting the user.');
      });
  },
};