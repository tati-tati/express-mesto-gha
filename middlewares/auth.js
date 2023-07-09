const jwt = require('jsonwebtoken');
const CustomError = require('../utils/errors');
const { ERROR_UNAUTHORIZED } = require('../utils/constants');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      throw new CustomError(ERROR_UNAUTHORIZED, 'Пользователь не найден!');
    }
    req.user = jwt.verify(token, 'вжух');
    next();
  } catch (err) {
    next(new CustomError(ERROR_UNAUTHORIZED, 'Пользователь не найден!!'));
  }
};

module.exports = auth;
