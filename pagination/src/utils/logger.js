// Simple logger utility
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logger = {
    info: (message, data = '') => {
        const timestamp = new Date().toISOString();
        const log = `[${timestamp}] INFO: ${message} ${data}`;
        console.log(log);
        appendLog('info', log);
    },

    error: (message, data = '') => {
        const timestamp = new Date().toISOString();
        const log = `[${timestamp}] ERROR: ${message} ${data}`;
        console.error(log);
        appendLog('error', log);
    },

    warn: (message, data = '') => {
        const timestamp = new Date().toISOString();
        const log = `[${timestamp}] WARN: ${message} ${data}`;
        console.warn(log);
        appendLog('warn', log);
    },

    debug: (message, data = '') => {
        if (process.env.NODE_ENV === 'development') {
            const timestamp = new Date().toISOString();
            const log = `[${timestamp}] DEBUG: ${message} ${data}`;
            console.log(log);
            appendLog('debug', log);
        }
    },
};

function appendLog(level, message) {
    const logFile = path.join(logsDir, `${level}.log`);
    fs.appendFile(logFile, message + '\n', (err) => {
        if (err) console.error('Failed to write log:', err);
    });
}

module.exports = logger;
