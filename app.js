const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const routes = require('./routes/main');

const { requestLogger } = require('./middlewares/logger');
const { errorLogger } = require('./middlewares/logger');

const constants = require('./utils/constants');

require('dotenv').config();

const { PORT = constants.envPORT } = process.env;
const httpCors = require('./utils/constants');

const CommonServerError = require('./errors/CommonServerError');

const app = express();
app.use(helmet());

app.disable('x-powered-by'); // отключим заголовок X-Powered-By

const limiter = require('./utils/limiter');

const options = {
  origin: httpCors,
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(options));

// app.use(cors({origin: NODE_ENV === 'production' ? httpCors : credentials: true }));

mongoose.connect(
  constants.urlMongo,
  { useNewUrlParser: true },
).then(() => console.log('connect mongo'));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(' Сервер упал ');
  }, 0);
});

app.use(errors()); // обработчик ошибок celebrate

app.use('/api/', routes);

app.use(errorLogger);

app.use(CommonServerError);

app.listen(PORT, () => {
  console.log(`Наш Волшебный Express is Working in console ${PORT}`);
});
