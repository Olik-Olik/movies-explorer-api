const userRoutes = require('express').Router();

const { updateUser } = require('../controllers/users');
const { getCurrentUser } = require('../controllers/users');

const { updateUserValidate, idValidator } = require('../validator/validator');

// возвращает информацию о пользователе (email и имя)
userRoutes.get('/users/me', idValidator, getCurrentUser);
// обновляет информацию о пользователе (email и имя)
userRoutes.patch('/users/me', updateUserValidate, updateUser);

module.exports = userRoutes;
