const Discord = require('discord.js');
const { muteUser } = require('../moderation/moderationHelper');

module.exports = {
    name: 'mute',
    description: 'Mute a user in the server',
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('You do not have permission to mute users.');
        }

        const target = message.mentions.users.first();
        if (!target) {
            return message.reply('Please specify a user to mute.');
        }

        const targetMember = message.guild.members.cache.get(target.id);
        if (targetMember.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('You cannot mute this user.');
        }

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('Mute role not found. Please create a Muted role.');
        }

        const muteTime = args[1];
        if (!muteTime) {
            return message.reply('Please specify the mute duration.');
        }

        targetMember.roles.add(muteRole);
        muteUser(target.id, muteTime); // Function to handle mute logic and duration

        message.channel.send(`<@${target.id}> has been muted for ${muteTime} minutes.`);
    },
};