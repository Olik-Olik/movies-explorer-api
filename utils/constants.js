// перенести все слова сюда
// import BadRequestError from "../errors/BadRequestError";

const messageNotFoundError = 'Нет  кино с таким id в базе';
const messageError = 'Сервер сейчас упадёт';
const messageUnAuthorizedError = 'Необходима авторизация! Неправильный email или пароль! Ошибка авторизации';
const messageBadRequestError = 'Пользователь  отсутствует, нет такого id';
const { adressMongo = 'mongodb://localhost:27017/mestodb' } = process.env;
const messageValidateImage = 'Измените линк постера к фильму - он неправильный';
const messageValidateTrailer = 'Измените линк - ссылку к трейлеру фильма - он неправильный';
const messageValidateThumbnail = 'Измените линк-он неправильный';
const messageValidateNameRU = 'Русское название фильма';
const messageValidateNameEn = 'Название фильма на английском языке';
const urlMongo = 'mongodb://localhost:27017/moviesdb';
const messageEmail = 'Измените формат почты - он неправильный';
const messageConflictError = 'Такой email в базе есть';


const httpCors = [
  'https://diplomback.nomoredomains.work',
  'https://diplomfront.nomoredomains.work',
  'http://diplomback.nomoredomains.work',
  'http://diplomfront.nomoredomains.work',
  'http://localhost:3627',
   //'http://localhost:3000',
];

// const  envPORT = 3624  ;
module.exports = {
  messageNotFoundError,
  messageError,
  messageUnAuthorizedError,
  messageBadRequestError,
  adressMongo,
  // envPORT,
  messageValidateImage,
  messageValidateTrailer,
  messageValidateThumbnail,
  messageValidateNameRU,
  messageValidateNameEn,
  urlMongo,
  messageEmail,
  httpCors,
  messageConflictError,
};
