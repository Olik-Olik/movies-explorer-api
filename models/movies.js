const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const messageValidateImage = require('../utils/constants');
const messageValidateTrailer = require('../utils/constants');
const messageValidateThumbnail = require('../utils/constants');
const messageValidateNameEn = require('../utils/constants');
const messageValidateNameRu = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  // — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: true,
  },
  // — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: true,
  },
  // — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: true,
  },
  // — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: true,
  },

  // — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: true,
  },

  // — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isUrl(link),
    },
    message: messageValidateImage,
  },
  // — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isUrl(link),
    },
    message: messageValidateTrailer,
  },

  // — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isUrl(link),
    },
    message: messageValidateThumbnail,
  },

  // — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  // — название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: true,
    default: messageValidateNameRu,
  },
  // — название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
    default: messageValidateNameEn,
  },

});
module.exports = mongoose.model('movies', movieSchema);
