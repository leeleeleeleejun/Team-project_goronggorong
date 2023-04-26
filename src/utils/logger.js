import winston from 'winston';

const { combine, colorize, timestamp, printf } = winston.format;

const logger = winston.createLogger({
  format: combine(
    colorize({ level: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({ level: 'silly' }),
    new winston.transports.File({
      level: 'debug',
      filename: 'debug.log',
      dirname: process.cwd() + '/log',
    }),
  ],
});

const httpLogStream = {
  write: (message) => {
    logger.http(message);
  },
};

export default httpLogStream;
