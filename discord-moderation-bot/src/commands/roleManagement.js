const Discord = require('discord.js');

module.exports = {
  name: 'rolemanagement',
  description: 'Assign or remove roles based on user behavior or server rules',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      return message.reply('You do not have the required permissions to manage roles.');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a valid member of this server');
    }

    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply('Please mention a valid role to assign or remove');
    }

    if (args[0] === 'assign') {
      if (member.roles.cache.has(role.id)) {
        return message.reply('User already has that role');
      }

      member.roles.add(role);
      message.reply(`Successfully assigned ${role.name} role to ${member.user.tag}`);
    } else if (args[0] === 'remove') {
      if (!member.roles.cache.has(role.id)) {
        return message.reply('User does not have that role');
      }

      member.roles.remove(role);
      message.reply(`Successfully removed ${role.name} role from ${member.user.tag}`);
    } else {
      message.reply('Please provide a valid action (assign/remove)');
    }
  }
};