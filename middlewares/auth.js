const jwt = require('jsonwebtoken');
const CustomError = require('../utils/errors');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      throw new CustomError(401, 'Пользователь не найден');
    }
    req.user = jwt.verify(token, 'вжух');
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
