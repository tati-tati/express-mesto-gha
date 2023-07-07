const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar, login,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

router.post('/signin', login);

router.post('/signup', createUser);

module.exports = router;
