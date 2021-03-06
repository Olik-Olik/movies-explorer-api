const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message({'any.required':'Заполните поле email'}),
    password: Joi.string().required().min(8),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(80).required(),
    email: Joi.string().required().email(),
  }),
});

// signup
const userValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(80),
  }),
});

const idParamsValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required(),
  }),
});

const idValidator = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const movieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(80),
    director: Joi.string().required().min(2).max(80),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(2).max(3000),
    nameRU: Joi.string().required().min(2).max(80),
    nameEN: Joi.string().required().min(2).max(80),
    trailer: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    image: Joi.string().custom(validateURL),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  loginValidate,
  updateUserValidate,
  userValidate,
  idParamsValidator,
  idValidator,
  movieValidate,
};
