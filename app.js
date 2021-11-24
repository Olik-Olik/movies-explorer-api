require('dotenv').config();
// console.log(process.env.NODE_ENV);
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');// не нужен
const { errors } = require('celebrate');
const router = require('express').Router(); // корневой роутер
// const { logger } = require('express-winston');
// const rateLimit = require('express-rate-limit');
const { requestLogger } = require('./middlewares/logger');
const { errorLogger } = require('./middlewares/logger');
const routes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
// const envPORT = require('./utils/constants');
const { createUser, login } = require('./controllers/users');

// const { PORT = envPORT } = process.env;
const { PORT = 3627 } = process.env;
const errorInternalServerError = require('./errors/errorInternalServerError');

//const httpCors =require('./utils/constants');
const app = express();
app.use(helmet());

app.disable('x-powered-by'); // отключите заголовок X-Powered-By
// Если вы используете helmet.js, это будет сделано автоматически
// const urlMongo = require('./utils/constants');
const limiter = require('./utils/limiter');
const auth = require('./middlewares/auth');
const { loginValidate, userValidate } = require('./validator/validator');

//
const httpCors = 'http://localhost:3627';

const options = {
  origin: httpCors,
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

const { messageError, messageNotFoundError } = require('./utils/constants');
const {log} = require("nodemon/lib/utils");

// app.use(cors(options));

mongoose.connect(
  // 'urlMongo',
  'mongodb://localhost:27017/moviesdb',
  { useNewUrlParser: true },
).then(() => console.log('connect mongo'));
//  { useCreateIndex: true },
// { useFindAndModify: false })
// .then(() => console.log('connect mongo'));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Логгер запросов до  роутов
/*
app.use(requestLogger);
app.use(limiter);
*/

/*
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(messageError);
  }, 0);
});
*/

//app.use(errors()); // обработчик ошибок celebrate
// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
app.post('/signin', loginValidate, login);
// # создаёт пользователя с переданными в теле
// # email, password и name
app.post('/signup', userValidate, createUser);

// Защитите роуты авторизацией: если клиент не прислал JWT,
// доступ к роутам ему должен быть закрыт
app.use(auth);
app.use(routes);
app.use(moviesRoutes);

app.use(() => {
  throw new NotFoundError(messageNotFoundError);
});
// errorLogger нужно подключить после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

app.use(errorInternalServerError);
/*
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err)
  res.status(statusCode).send({
    message: statusCode === 500
      ? `На сервере произошла ошибка: ${err.toString()}` : message,
  });
  next();
});
*/

app.listen(PORT, () => {
  console.log(`Express is Working in console ${PORT}`);
});

module.exports = { router };
