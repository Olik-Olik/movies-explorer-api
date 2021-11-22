import {idParamsValidator, movieValidate} from "../validator/validator";

export const moviesRouter = require('express').Router();

const {getMovies, createMovie, deleteMovie} = require("../controllers/movies");

//возвращает все сохранённые пользователем фильмы
moviesRouter.get('/movies',movieValidate,  getMovies);

//создаёт фильм с переданными в теле
//country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
moviesRouter.post('/movies',idParamsValidator, movieValidate, createMovie );
//удаляет сохранённый фильм по id
moviesRouter.delete('/movies/movieId' , idParamsValidator, deleteMovie)
