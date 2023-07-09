const jwt = require('jsonwebtoken');
const CustomError = require('../utils/errors');

const auth = (req, res, next) => {
  try {
    console.log(req.cookies.jwtToken);

    const token = req.cookies.jwtToken;
    if (!token) {
      throw new CustomError(401, 'Пользователь не найден!');
    }
    req.user = jwt.verify(token, 'вжух');
    next();
  } catch (err) {
    next(new CustomError(401, 'Пользователь не найден!!'));
  }
};

module.exports = auth;
