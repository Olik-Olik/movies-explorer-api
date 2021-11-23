const moviesRouter = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidate } = require('../validator/validator');
const { idParamsValidator } = require('../validator/validator');
// возвращает все сохранённые пользователем фильмы
moviesRouter.get('/movies', movieValidate, getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
moviesRouter.post('/movies', idParamsValidator, movieValidate, createMovie);
// удаляет сохранённый фильм по id
moviesRouter.delete('/movies/movieId', idParamsValidator, deleteMovie);

module.exports = moviesRouter;
