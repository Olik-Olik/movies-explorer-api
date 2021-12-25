// для выявления приложений на базе Express и активации целенаправленных атак
// Не забыть!! В отдельный файл перенести Ревьюер посоветовал
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
  message: 'limit each IP to 10000 requests  Превышен лимит запросов с Вашего IP',
});
module.exports = limiter;
