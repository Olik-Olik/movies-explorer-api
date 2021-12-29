const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const { UnAuthorizedError } = require('../errors/UnAuthorizedError');
const { messageUnAuthorizedError } = require('../utils/constants');
const { messageEmail } = require('../utils/constants');
const { messageError } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  /*  default: 'Жак-Ив Кусто',*/

  },

  // существование и подлинность
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    /*  message: messageError,*/
      /*default: 'oly_p@mail.ru',*/
      message: 'Измените формат почты-он неправильный',
    },
  },

  password: {
    type: String,
    required: true,
    select: false, // по умолчанию хеш пароля пользователя не будет возвращаться
  },
});


userSchema.statics.findUserByCredentials = function ({ userEmail, userPassword }) {
  return this.findOne({ email: userEmail }).select('+password')
    .then((user) => {
      if (!user) {
        console.log('User not found');
        throw new UnAuthorizedError(messageUnAuthorizedError);
      }
      // если прошла авторизация, то выдаем фильмы по этому юзеру
      const matched = bcrypt.compareSync(userPassword, user.password);
      if (matched) {
        console.log(`User: ${user.toString()}`);
        return {
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
          },
        };
      }
      throw new UnAuthorizedError(messageUnAuthorizedError);
    });
};
module.exports = mongoose.model('user', userSchema);
