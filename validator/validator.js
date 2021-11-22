const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
//const isUrl = require('validator/lib/isURL');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

export const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
})

export const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(150).required(),
    email: Joi.string().required().email(),
  }),
});

//signup
export const userValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(150),
  }),
});

export const idParamsValidator = celebrate({
  params: Joi.object().keys({
    movieId: [Joi.string(), Joi.number()].length(24).hex().required(),
  }),
});

export const idValidator = celebrate({
  body: Joi.object().keys({
    id: [Joi.string(), Joi.number()].length(24).hex().required(),
  }),
});

export const movieValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(150),
    director: Joi.string().required().min(2).max(150),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(2).max(3000),
    movieId: [Joi.string(), Joi.number()].required(),
    nameRU: Joi.string().required().min(2).max(150),
    nameEN: Joi.string().required().min(2).max(150),
    country: Joi.string().required().min(2).max(150),
    trailerLink:  Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
  })
});
