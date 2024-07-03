const schedule = require('node-schedule');
const Discord = require('discord.js');

module.exports = {
  scheduleMessage: function(client, channelId, message, date) {
    const channel = client.channels.cache.get(channelId);
    if (!channel) {
      console.error(`Channel with ID ${channelId} not found`);
      return;
    }

    const scheduledDate = new Date(date);
    if (scheduledDate <= new Date()) {
      console.error('Scheduled date must be in the future');
      return;
    }

    const job = schedule.scheduleJob(scheduledDate, function() {
      channel.send(message);
    });

    console.log(`Message scheduled for ${scheduledDate}`);
    return job;
  },

  cancelScheduledMessage: function(job) {
    if (job) {
      job.cancel();
      console.log('Scheduled message canceled');
    } else {
      console.error('No scheduled message found to cancel');
    }
  }
};