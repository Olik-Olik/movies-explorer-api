require('dotenv').config();

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');// не нужен
const { errors } = require('celebrate');
const router = require('express').Router(); // корневой роутер
const { requestLogger } = require('./middlewares/logger');
const { errorLogger } = require('./middlewares/logger');
const routes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const constants = require('./utils/constants');
const { createUser, login } = require('./controllers/users');

const { PORT = constants.envPORT } = process.env;
const CommonServerError = require('./errors/CommonServerError');

const httpCors = require('./utils/constants');

const app = express();
app.use(helmet());

app.disable('x-powered-by'); // отключите заголовок X-Powered-By
// Если вы используете helmet.js, это будет сделано автоматически
// const urlMongo = require('./utils/constants');
const limiter = require('./utils/limiter');
const auth = require('./middlewares/auth');
const { loginValidate, userValidate } = require('./validator/validator');

const options = {
  origin: httpCors,
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

const { messageError, messageNotFoundError } = require('./utils/constants');

app.use(cors(options));

mongoose.connect(
  constants.urlMongo,
  { useNewUrlParser: true },
).then(() => console.log('connect mongo'));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Логгер запросов до  роутов

app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(messageError);
  }, 0);
});

app.use(errors()); // обработчик ошибок celebrate
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

app.use(CommonServerError);

app.listen(PORT, () => {
  console.log(`Express is Working in console ${PORT}`);
});

module.exports = { router };
