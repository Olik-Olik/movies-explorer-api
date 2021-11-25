const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
// const process = require('process');
const messageUnAuthorizedError = require('../utils/constants');

const {
  NODE_ENV,
  JWT_SECRET_KEY,
} = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Bearer authentication should only be used over HTTPS (SSL)
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnAuthorizedError(messageUnAuthorizedError);
  }
  const token = authorization.replace('Bearer ', '');
  // в тело payload пишем
  try {
    jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
    req.userId = jwt.decode(token)._id;
    next();
  } catch (e) {
    const err = new UnAuthorizedError(messageUnAuthorizedError);
    next(err);
  }
};
