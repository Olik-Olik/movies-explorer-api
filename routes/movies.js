const router = require('express').Router();


const { idValidator } = require('../validator/validator');

//возвращает все сохранённые пользователем фильмы
router.get('/movies', );
//создаёт фильм с переданными в теле
//country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', );
//удаляет сохранённый фильм по id
router.delete('/movies/movieId')
module.exports = router;