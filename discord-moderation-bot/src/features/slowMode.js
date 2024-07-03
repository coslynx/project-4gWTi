const Discord = require('discord.js');

module.exports = {
    name: 'slowmode',
    description: 'Set slow mode in a channel',

    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply('You do not have the permission to use this command.');
        }

        const time = parseInt(args[0]);

        if (isNaN(time) || time < 0 || time > 21600) {
            return message.reply('Please enter a valid time between 0 and 21600 seconds.');
        }

        message.channel.setRateLimitPerUser(time)
            .then(() => {
                message.channel.send(`Slow mode set to ${time} seconds.`);
            })
            .catch(error => {
                console.error('Error setting slow mode:', error);
                message.reply('There was an error setting slow mode.');
            });
    },
};