//с путем проблема, хочет лицензию, а я-не хочу, попробую такЮ
const winston = require('winston');
const expressWinston = require('express-winston');

//const path = require('path');
//const pathWithLogs = path.join(__dirname, '../logs');

// Запросы к серверу будем логировать, лог пишем в файл,
//чтобы хранить информацию о всех запросах к API
export const requestLogger = expressWinston.logger({
 // transports: [new winston.transports.File({ filename: path.join(pathWithLogs, 'request.log') }),],
  transports: [new winston.transports.File({filename: 'logs/request.log'})],
  level: 'info',
  format: winston.format.json(), // формат записи логов json
});



// Ошибки сервера будем логировать.
export const errorLogger = expressWinston.errorLogger({
 // transports: [new winston.transports.File({ filename: path.join(pathWithLogs, 'error.log') })],
  transports: [new winston.transports.File({ filename: 'logs/error.log' })],
  level: 'error',
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
