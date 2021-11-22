//перенести все слова сюда
//import BadRequestError from "../errors/BadRequestError";

const messageNotFoundError = 'Нет такой страницЫ';
const messageError ='Сервер сейчас упадёт';
const messageUnAuthorizedError = 'Необходима авторизация!';
const messageBadRequestError = 'Пользователь  отсутствует';
const {adressMongo = 'mongodb://localhost:27017/mestodb'} = process.env;
//const  envPORT = 3624  ;
module.exports = {
  messageNotFoundError,
  messageError,
  messageUnAuthorizedError,
  messageBadRequestError,
  adressMongo ,
  //envPORT,
};