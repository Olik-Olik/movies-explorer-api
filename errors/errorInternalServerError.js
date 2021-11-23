const errorInternalServerError = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? `На сервере произошла ошибка: ${err.toString()}` : message,
  });
  next();
});
module.exports = errorInternalServerError;