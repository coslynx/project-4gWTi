const fs = require('fs');

function logAction(action, user, reason) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${action} performed on user ${user} for reason: ${reason}\n`;

    fs.appendFile('moderation.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file');
        }
    });
}

module.exports = {
    logAction
};