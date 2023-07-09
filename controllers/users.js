const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorWrongData, errorNotFound, errorServerFailed } = require('../utils/constants');
const CustomError = require('../utils/errors');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    errorServerFailed();
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    // console.log(req);
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError(404, 'Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    // console.log(req);
    const user = await User.findById(id);
    if (!user) {
      errorNotFound(res);
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    if (!email || !password) {
      throw new CustomError(404, 'Переданы неверные данные');
    }

    const passHashed = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name, about, avatar, email, password: passHashed,
    });
    if (!user) {
      throw new CustomError(400, 'Пользователь не создан');
    }
    res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new CustomError(404, 'Переданы неверные данные'));
    }
    next(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    if (!name || !about) {
      errorWrongData(res);
      return;
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      errorNotFound(res);
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    errorServerFailed();
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      errorWrongData(res);
      return;
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      errorNotFound(res);
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    errorServerFailed();
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError(404, 'Переданы неверные данные');
    }

    const user = User.findOne({ email }).select('+password');
    if (!user || !bcrypt.compare(password, user.password)) {
      throw new CustomError(404, 'Переданы неверные данные');
    }
    const token = jwt.sign({ _id: user._id }, 'вжух', { expiresIn: '7d' });
    const cookieOption = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie('jwtToken', token, cookieOption); // maxAge: 24 hours
    res.send({ message: 'Вход выполнен' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getCurrentUser, getUserById, createUser, updateUser, updateUserAvatar, login,
};
