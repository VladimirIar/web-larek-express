import winston from 'winston';
import expressWinston from 'express-winston';

export const reqestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});
