const messageNotFoundError = 'Нет  кино с таким id в базе';
const messageError = 'Сервер сейчас упадёт';
const messageUnAuthorizedError = 'Необходима авторизация! Неправильный email или пароль! Ошибка авторизации';
const messageBadRequestError = 'Пользователь  отсутствует, нет такого id';
const messageValidateImage = 'Измените линк постера к фильму - он неправильный';
const messageValidateTrailer = 'Измените линк - ссылку к трейлеру фильма - он неправильный';
const messageValidateThumbnail = 'Измените линк-он неправильный';
const messageValidateNameRU = 'Русское название фильма';
const messageValidateNameEn = 'Название фильма на английском языке';
const messageEmail = 'Измените формат почты - он неправильный';
const messageConflictError = 'Такой email в базе есть';
const messageValidateError = 'Неправильный формат ссылки';
const messageForbiddenError = 'Чужие карточки не удаляют';
const messageDelete = 'Карточка удалена';
const envPORT = 3627;
const httpCors = [
  'https://diplomback.nomoredomains.work',
  'https://diplomfront.nomoredomains.work',
  'http://diplomback.nomoredomains.work',
  'http://diplomfront.nomoredomains.work',
  'http://localhost:3627',
  // 'http://localhost:3000',
];
const { NODE_ENV } = process.env;

const JWT_SECRET_KEY = NODE_ENV === 'production' ? process.env.JWT_SECRET_KEY : 'dev-secret';
const urlMongo = NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  messageNotFoundError,
  messageError,
  messageUnAuthorizedError,
  messageBadRequestError,
  messageValidateImage,
  messageValidateTrailer,
  messageValidateThumbnail,
  messageValidateNameRU,
  messageValidateNameEn,
  urlMongo,
  envPORT,
  JWT_SECRET_KEY,
  messageEmail,
  httpCors,
  messageConflictError,
  messageValidateError,
  messageForbiddenError,
  messageDelete,
};
