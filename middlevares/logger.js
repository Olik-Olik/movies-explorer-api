
const winston = require('winston');
const expressWinston = require('express-winston');

//const path = require('path');
//const pathWithLogs = path.join(__dirname, '../logs');

// Запросы к серверу будем логировать, лог пишем в файл.
const requestLogger = expressWinston.logger({
 // transports: [new winston.transports.File({ filename: path.join(pathWithLogs, 'request.log') }),],
  transports: [new winston.transports.File({filename: 'request.log'})],
  level: 'info',
  format: winston.format.json(), // формат записи логов json
});

// Ошибки сервера будем логировать.
const errorLogger = expressWinston.errorLogger({
 // transports: [new winston.transports.File({ filename: path.join(pathWithLogs, 'error.log') })],
  transports: [new winston.transports.File({ filename: 'error.log' })],
  level: 'info',
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
