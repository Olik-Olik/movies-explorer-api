const routes = require('express').Router();
// signin
const { loginValidate }  = require('../validator/validator');
// signup
const { userValidate } = require('../validator/validator');

const { login, createUser } = require('../controllers/users');

const userRoutes = require('./users');
const moviesRoutes = require('./movies');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');
const { messageNotFoundErrorPage } = require('../utils/constants');

routes.post('/signin', loginValidate, login);
routes.post('/signup', userValidate, createUser);

routes.use(auth, userRoutes);
routes.use(auth, moviesRoutes);

routes.use('/*', () => {
  throw new NotFoundError(messageNotFoundErrorPage);
});

const defaultRoute404 = () => {
  throw new NotFoundError(messageNotFoundErrorPage);
};

module.exports = { routes, defaultRoute404 };
