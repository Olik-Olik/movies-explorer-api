// 401
class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = UnAuthorizedError;

// 400, когда с запросом что-то не так;
// 401, когда что-то не так при аутентификации или авторизации;
// 404, например, когда мы не нашли ресурс по переданному _id;
