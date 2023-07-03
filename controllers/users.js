const User = require('../models/user');
const { errorWrongData, errorNotFound, errorServerFailed } = require('../utils/constants');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    errorServerFailed();
  }
};

const getUserById = async (req, res) => {
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
    // console.log(err.name);
    errorServerFailed();
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    if (!name || !about || !avatar) {
      errorWrongData(res);
      return;
    }
    const user = await User.create({ name, about, avatar });
    if (!user) {
      errorNotFound(res);
      return;
    }
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    errorServerFailed();
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

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar,
};
