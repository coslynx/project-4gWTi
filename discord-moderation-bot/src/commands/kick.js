const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    execute(message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('You do not have permission to kick members.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention the user to kick.');
        }

        const member = message.guild.member(user);
        if (member) {
            member
                .kick('Kicked by moderator')
                .then(() => {
                    message.channel.send(`${user.tag} has been kicked.`);
                })
                .catch(err => {
                    message.reply('I was unable to kick the member. Please check my permissions.');
                    console.error(err);
                });
        } else {
            message.reply('That user is not in this server.');
        }
    },
};