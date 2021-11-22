export const router = require('express').Router();

const { updateUser } = require('../controllers/users');
const { getCurrentUser } = require('../controllers/users');

const {updateUserValidate, idValidator } = require('../validator/validator');

//возвращает информацию о пользователе (email и имя)
router.get('/users/me', idValidator, getCurrentUser);
//обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateUserValidate, updateUser);

