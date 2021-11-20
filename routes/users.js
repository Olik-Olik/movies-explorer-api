const router = require('express').Router();

const { updateUser } = require('../controllers/users');
const { getCurrentUser } = require('../controllers/users');

const {updateUserValidate,} = require('../validator/validator');
const { idValidator } = require('../validator/validator');

//возвращает информацию о пользователе (email и имя)
router.get('/users/me', idValidator, getCurrentUser);
//обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateUserValidate, updateUser);

//router.get('/users/:id', idParamsValidator, getUser);

module.exports = router;