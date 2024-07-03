const antiSpamMeasures = {
  spamThreshold: 5,
  spamInterval: 10000,
  spamTracker: {},

  checkSpam: (message) => {
    const userId = message.author.id;

    if (!antiSpamMeasures.spamTracker[userId]) {
      antiSpamMeasures.spamTracker[userId] = {
        count: 1,
        lastMessageTime: Date.now(),
      };
    } else {
      const currentTime = Date.now();
      const timeDifference = currentTime - antiSpamMeasures.spamTracker[userId].lastMessageTime;

      if (timeDifference < antiSpamMeasures.spamInterval) {
        antiSpamMeasures.spamTracker[userId].count++;

        if (antiSpamMeasures.spamTracker[userId].count >= antiSpamMeasures.spamThreshold) {
          // Implement action for spam behavior here
          console.log(`User ${userId} is spamming`);
        }
      } else {
        antiSpamMeasures.spamTracker[userId] = {
          count: 1,
          lastMessageTime: currentTime,
        };
      }
    }
  },

  clearSpamTracker: () => {
    setInterval(() => {
      Object.keys(antiSpamMeasures.spamTracker).forEach((userId) => {
        if (Date.now() - antiSpamMeasures.spamTracker[userId].lastMessageTime > antiSpamMeasures.spamInterval) {
          delete antiSpamMeasures.spamTracker[userId];
        }
      });
    }, antiSpamMeasures.spamInterval);
  },
};

antiSpamMeasures.clearSpamTracker();

module.exports = antiSpamMeasures;