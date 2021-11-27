// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const constants = require('constants');
const User = require('../models/users');
const ConflictError = require('../errors/ConflictError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const { messageUnAuthorizedError } = require('../utils/constants');
// 400 когда с запросом что-то не так;

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

  const {
    name,
    email,
    password,
  } = req.body;

  if (!name || !password || !email) {
    throw new BadRequestError('В запросе отсутствует верные почта или пароль пользователя');
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
        throw new ConflictError('Пользователь с такой почтой уже есть');
      }
      if (eerr.name === 'ValidationError') {
        /// ////7777
        /*    next(new BadRequestError(messageBadRequestError)); */
        throw new BadRequestError('Данные пароля и/или почты неверные, измените');
      } else {
        next(eerr);
      }
    })
  /// ////7777
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
    /*  throw new BadRequestError(messageBadRequestError); */
      throw new BadRequestError('нет пользователя  с таким id');
    })
    .then((user) => res.status(200).send(user))
    /// ////7777
    .catch((eerr) => {
      if (eerr.code === 11000) {
        next(new ConflictError('пользователь с таким id уже есть'));
      }
      if (eerr.name === 'ValidationError') {
        /// ////7777
        /*    next(new BadRequestError(messageBadRequestError)); */
        next(new BadRequestError('кривые данные'));
      } else {
        next(eerr);
      }
    })
    /// ////7777
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
        constants.JWT_SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.status(201).send({ token });
    }
  }).catch(next);
};
