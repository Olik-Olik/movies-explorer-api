const jwt = require('jsonwebtoken');
const {UnAuthorizedError} = require('../errors/UnAuthorizedError');
const { JWT_SECRET_KEY, messageUnAuthorizedError } = require('../utils/constants');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;


  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnAuthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  // в тело payload пишем
  /*let payload;
  try {
  payload = jwt.verify(token, JWT_SECRET_KEY);
  req.user = payload;
  } catch (e){
    throw new UnAuthorizedError(messageUnAuthorizedError);
  }
*/
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    req.userId = jwt.decode(token)._id;
    next();
  } catch (e) {
    const err = new UnAuthorizedError('Необходима авторизация');
    next(err);
  }
};