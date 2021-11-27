const router = require('express').Router();
// signin
const { loginValidate } = require('../validator/validator');
// signup
const { userValidate } = require('../validator/validator');

const { login, createUser } = require('../controllers/users');

const routes = require('./users');
const moviesRoutes = require('./movies');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const express = require("express");

router.post('/signin', loginValidate, login);
router.post('/signup', userValidate, createUser);

router.use(auth, routes);
router.use(auth, moviesRoutes);

router.use('/*', () => {
  throw new NotFoundError('Такой страницы нет');
});

module.exports = router;
