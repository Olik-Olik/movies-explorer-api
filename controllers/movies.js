const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');// 404 например, когда мы не нашли ресурс по переданному _id;
const BadRequestError = require('../errors/BadRequestError');// 400 когда с запросом что-то не так;
const ForbiddenError = require('../errors/ForbiddenError');// 403
// const ConflictError = require('../errors/ConflictError');// 409

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  /* Movie.find({owner}).sort({ createdAt: -1 })
    .populate('user') */
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => res.status(500).send(` Server Mistake ${err.message}`))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  return Movie.create({
    owner, ...req.body,
  /*  owner: req.userId,
    name: newName,
    link: newLink, */
    // тут много всего  может ... использовать или все перечислить- да , именно так
  })
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Невалидный id пользователя '));
      }
      next(err);
      // res.status(500).send({ message: `Произошла ошибка:  ${err.message}` });
    }).catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  const owner = req.user._id;
  Movie.findById({ _id: movieId })
    //  выдает ошибку, если ни один документ не соответствует id
    .orFail(() => {
      throw new NotFoundError('Нет карточки с таким id в базе');
    })
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        Movie.deleteOne({ _id: movieId })
          .then(() => res.status(200).send({ message: 'Карточка удалена.' }));
      } else {
        console.log('Чужая карточка!');
        throw new ForbiddenError('Чужие карточки не удаляют');
      }
    }).catch(next);
};
