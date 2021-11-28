const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const { JWT_SECRET_KEY, messageUnAuthorizedError } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Bearer authentication should only be used over HTTPS (SSL)
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnAuthorizedError(messageUnAuthorizedError);
  }
  const token = authorization.replace('Bearer ', '');
  // в тело payload пишем
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    req.userId = jwt.decode(token)._id;
    next();
  } catch (e) {
    const err = new UnAuthorizedError(messageUnAuthorizedError);
    next(err);
  }
};
