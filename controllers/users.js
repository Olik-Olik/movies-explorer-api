// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { ConflictError } = require('../errors/ConflictError');
const { UnAuthorizedError } = require('../errors/UnAuthorizedError');
const { BadRequestError } = require('../errors/BadRequestError');
const {
  JWT_SECRET_KEY, messageUnAuthorizedError, messageConflictErrorUser,
  messageBadRequestErrorUser, messageBadRequestErrorData,
  messageBadRequestErrorUserId, messageBadRequestErrorBadData,
  messageConflictErrorUserEmail,
} = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.userId;
  return User.findById({ _id: id })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  console.log(req.body.email);

  const {
    name,
    email,
    password,
  } = req.body;

  if (!name || !password || !email) {
    throw new BadRequestError(messageBadRequestErrorUser);
  }
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
        throw new ConflictError(messageConflictErrorUser);
      }
      if (eerr.name === 'ValidationError') {
        throw new BadRequestError(messageBadRequestErrorData);
      } else {
        next(eerr);
      }
    })
    .catch(next);
};
// patch  /users/me обновляет информацию о пользователе (email и имя)
module.exports.updateUser = (req, res, next) => {
  const { userId } = req;
  const newName = req.body.name;
  const newEmail = req.body.email;
  return User.findByIdAndUpdate(
    { _id: userId },
    {
      name: newName,
      email: newEmail,
    },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new BadRequestError(messageBadRequestErrorUserId);
    })
    .then((user) => res.status(200).send(user))
    .catch((eerr) => {
      if (eerr.code === 11000) {
        next(new ConflictError(messageConflictErrorUserEmail));
      }
      if (eerr.name === 'ValidationError') {
        next(new BadRequestError(messageBadRequestErrorBadData));
      } else {
        next(eerr);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  return User.findUserByCredentials({ userEmail, userPassword }).then((user) => {

    if (!user) {
      throw new UnAuthorizedError(messageUnAuthorizedError);
    } else {
      const token = jwt.sign({ _id: user.data.id },
        JWT_SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.status(201).send({ token });
    }
  }).catch(next);
};
