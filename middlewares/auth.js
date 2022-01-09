const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const { JWT_SECRET_KEY, messageUnAuthorizedError } = require('../utils/constants');

module.exports = (req, res, next) => {
  console.log('!!!');
  const {authorization} = req.headers;
  console.log(authorization);
  console.log('ChT');
  if (!authorization || !authorization.startsWith('Bearer')) {
    console.log('Нет авторизации');
    const err = new UnAuthorizedError(messageUnAuthorizedError);
    next(err);
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
    console.log('userId attribute set.');
    next();
  } catch (e) {
    console.log('E:' + e.toString());
    const err = new UnAuthorizedError(messageUnAuthorizedError);
    next(err);
  }
};