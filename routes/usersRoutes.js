const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

router.post('/users', createUser);

module.exports = router;
