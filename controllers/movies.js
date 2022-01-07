const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');// 404 например, когда мы не нашли ресурс по переданному _id;
const BadRequestError = require('../errors/BadRequestError');// 400 когда с запросом что-то не так;
const ForbiddenError = require('../errors/ForbiddenError');// 403
const { messageBadRequestError } = require('../utils/constants');
const { messageNotFoundErrorFilm } = require('../utils/constants');
const { messageRemoveFilm } = require('../utils/constants');
const { messageForbiddenErrorDel, messageBadRequestErrorFilm } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.userId;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

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
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messageBadRequestError));
      } else {
        next(err);
      }
    }).catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.userId;
  Movie.findOne({owner: owner, movieId: movieId})
    //  выдает ошибку, если ни один документ не соответствует id
    .orFail(() => {
      throw new NotFoundError(messageNotFoundErrorFilm);
    })
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        return Movie.findByIdAndDelete(movie._id)
          .then(() => res.status(200).send({ message: messageRemoveFilm })
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequestError(messageBadRequestErrorFilm));
              } else {
                next(err);
              }
            })
            .catch(next));
      }

      throw new ForbiddenError(messageForbiddenErrorDel);
    }).catch(next);
};
