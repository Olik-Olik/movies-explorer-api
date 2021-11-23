// перенести все слова сюда
// import BadRequestError from "../errors/BadRequestError";

const messageNotFoundError = 'Нет такой страницЫ';
const messageError = 'Сервер сейчас упадёт';
const messageUnAuthorizedError = 'Необходима авторизация!Неправильный email или пароль';
const messageBadRequestError = 'Пользователь  отсутствует';
const { adressMongo = 'mongodb://localhost:27017/mestodb' } = process.env;
const messageValidateImage = 'Измените линк постера к фильму - он неправильный';
const messageValidateTrailer = 'Измените линк - ссылку к трейлеру фильма - он неправильный';
const messageValidateThumbnail = 'Измените линк-он неправильный';
const messageValidateNameRU = 'Русское название фильма';
const messageValidateNameEn = 'Название фильма на английском языке';
const urlMongo = 'mongodb://localhost:27017/mestodb';
const messageEmail = 'Измените формат почты - он неправильный';

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
};
