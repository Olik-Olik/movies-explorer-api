const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const moviesSchema = new mongoose.Schema({
  //— страна создания фильма. Обязательное поле-строка.
  country:{
    type: String,
    required: true,
  },
 //— режиссёр фильма. Обязательное поле-строка.
  director:{
    type: String,
    required: true,
  },
  //— длительность фильма. Обязательное поле-число.
  duration:{
    type: Number,
    required: true,
  },
 //— год выпуска фильма. Обязательное поле-строка.
  year:{
    type: String,
    required:true,
  },
 //— описание фильма. Обязательное поле-строка.
  description:{
    type: String,
    required:true,
  },
 // — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image:{
    // type: String подумать
    type: isUrl,//проверить, можно ли так
  //  default: '',
    required:true,
    validate: {
      validator: (link) => isUrl(link),
    },
    message: 'Измените линк постера к фильму - он неправильный',
  },
  //— ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailer:{
    type: isUrl,//проверить, можно ли так
   // default: '',
    required:true,
    validate: {
      validator: (link) => isUrl(link),
    },
    message: 'Измените линк - ссылку к трейлеру фильма - он неправильный',
  },
  //— миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail:{
    type:isUrl,//проверить, можно ли так
   // default: '',
    required:true,
    validate: {
      validator: (link) => isUrl(link),
    },
    message: 'Измените линк-он неправильный',
  },
  //— _id пользователя, который сохранил фильм. Обязательное поле.
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  //— id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.

  movieId:{
    type: String,
    required: true,
//    ref: 'film', подумать
  },
  //— название фильма на русском языке. Обязательное поле-строка.
  nameRU:{
    type: String,
    required: true,
    default:'Русское название фильма'
  },
  //— название фильма на английском языке. Обязательное поле-строка.
  nameEN:{
    type: String,
    required: true,
    default:'English name of film'
  },
  // В ТЗ про них не сказано, но они есть у каждого пользователя, может и не понадобятся
  /*   likes:
     {
        type: Array,
        required: false,
        default: [],// скорее не понадобится, либо да либо нет true-false
      },*/
});
module.exports = mongoose.model('movies', moviesSchema);
/*
return {
  data: {
    id: movies._id,
    director: movies.director,
    duration: movies.duration,
    thumbnail: movies.thumbnail,
    year: movies.year,
    description: movies.description,
    owner:movies.owner,
    movieId: movies.movieId,
    nameRU: movies.nameRU,
    nameEN: movies.nameEN,
    country: movies.country,
    trailerLink: movies.trailerLink,
  },
};*/
// "time" : ISODate("2018-04-05T10:08:24.148Z")
//   bson.EC.DateTime("time", time.Now().UnixNano()/1e6)
//time.Now().String()
