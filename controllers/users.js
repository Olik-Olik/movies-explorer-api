// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/users');
// const NotFoundError = require('../errors/NotFoundError');// 404
const ConflictError = require('../errors/ConflictError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const { messageBadRequestError } = require('../utils/constants');
const { messageConflictError } = require('../utils/constants');
const { messageUnAuthorizedError } = require('../utils/constants');
// 400 когда с запросом что-то не так;

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

// myUserId = id
// get /users/me
module.exports.getCurrentUser = (req, res, next) => {
  const id = req.userId;
  //  console.log(id);
  return User.findById({ _id: id })
    /*  .orFail(() => {
      console.log('user not found');
       throw new NotFoundError(messageBadRequestError);
     }) */
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  console.log(req.body.email);
  // eslint-disable-next-line no-unused-expressions
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((eerr) => {
      if (eerr.code === 11000) {
        next(new ConflictError(messageConflictError));
      }
      if (eerr.name === 'ValidationError') {
        next(new BadRequestError(messageBadRequestError));
      } else {
        next(eerr);
      }
    });
};
// patch  /users/me обновляет информацию о пользователе (email и имя)
module.exports.updateUser = (req, res, next) => {
  req.userId = req.user._id;
  const newName = req.body.name;
  const newEmail = req.body.email;

  return User.findByIdAndUpdate(
    { _id: req.userId },
    {
      name: newName,
      about: newEmail,
    },

    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new BadRequestError(messageBadRequestError);
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  return User.findUserByCredentials({ userEmail, userPassword }).then((user) => {
    if (!user) {
      throw new UnAuthorizedError(messageUnAuthorizedError);
    } else {
      const token = jwt.sign(
        { _id: user.data.id },
        NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
        // 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.status(201).send({ token });
    }
  }).catch(next);
};
