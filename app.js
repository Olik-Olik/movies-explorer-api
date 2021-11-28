require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { routes } = require('./routes/main');
const { defaultRoute404 } = require('./routes/main');

const { requestLogger } = require('./middlewares/logger');
const { errorLogger } = require('./middlewares/logger');

const { httpCors, APP_PORT, MONGO_URI } = require('./utils/constants');

const CommonServerError = require('./errors/CommonServerError');

const app = express();
app.use(helmet());

app.disable('x-powered-by'); // отключим заголовок X-Powered-By

const limiter = require('./utils/limiter');
//const {defaultRoute} = require("./routes/main");

const { messageErrorServer } = require('./utils/constants');

const options = {
  origin: httpCors,
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(options));

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true },
).then(() => console.log('Connect mongo'));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(messageErrorServer);
  }, 0);
});

app.use('/api/', routes);

app.use('/*', defaultRoute404);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorLogger);

app.use(CommonServerError);

app.listen(APP_PORT, () => {
  console.log(`Наш Волшебный Express is Working in console ${APP_PORT}`);
});
