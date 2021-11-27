const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');// 404 например, когда мы не нашли ресурс по переданному _id;
const BadRequestError = require('../errors/BadRequestError');// 400 когда с запросом что-то не так;
const ForbiddenError = require('../errors/ForbiddenError');// 403
const messageNotFoundError = require('../utils/constants');
const messageBadRequestError = require('../utils/constants');
const messageForbiddenError = require('../utils/constants');
const messageDelete = require('../utils/constants');
// const ConflictError = require('../errors/ConflictError');// 409

module.exports.getMovies = (req, res, next) => {
  const owner = req.userId;
  /* Movie.find({owner}).sort({ createdAt: -1 })
    .populate('user') */
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => res.status(500).send(` Server Mistake ${err.message}`))
    .catch(next);
};
////owner: req.userId
module.exports.createMovie = (req, res, next) => {
  Movie.create({
    owner: req.userId,
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    image: req.body.image,

  })
    .then((movie) => res.status(201).send({movie}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messageBadRequestError));
      } else {
        next(err);
      }
      // res.status(500).send({ message: `Произошла ошибка:  ${err.message}` });
    }).catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.userId;
  ///////777

  Movie.findById( movieId )
    //  выдает ошибку, если ни один документ не соответствует id
    .orFail(() => {
      throw new NotFoundError('Такого фильма нет');
    })

    .then((movie) => {
      if (movie.owner.toString() === owner) {
       return Movie.findByIdAndDelete( movieId )
          ///// ###
          .then((dat) => res.status(200).send(dat)
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequestError('Нет такого id'));
              } else {
                next(err);
              }
            })
            .catch(next));
      }
      else {
        // console.log('Чужой фильм');
        throw new ForbiddenError(/*messageForbiddenError*/'Чужой фильм нельзя удалить');
      }
    }).catch(next);
};
