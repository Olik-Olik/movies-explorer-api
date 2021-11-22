const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
//const process = require('process');

const { NODE_ENV,
        JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { messageUnAuthorizedError } = require('../utils/constants');

  //Bearer authentication should only be used over HTTPS (SSL)
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnAuthorizedError(messageUnAuthorizedError);
  }
  const token = authorization.replace('Bearer ', '');
  //в тело payload пишем
  try {
    jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
    req.userId = jwt.decode(token)._id;
    next();
  } catch (e) {
    const err = new UnAuthorizedError(messageUnAuthorizedError);
    next(err);
  }
};
//const SECRET_KEY = 'cAtwa1kkEy'
//const unsignedToken = base64urlEncode(header) + '.' + base64urlEncode(payload)
//const signature = HMAC-SHA256(unsignedToken, SECRET_KEY)

//const token = encodeBase64Url(header) + '.'
// + encodeBase64Url(payload) + '.'
// + encodeBase64Url(signature)

