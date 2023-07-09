const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  // createUser,
  updateUser,
  updateUserAvatar,
  // login,
} = require('../controllers/users');
const {
  getUserByIdJoiValidate,
  updateUserJoiValidate, updateUserAvatarJoiValidate,
} = require('../middlewares/validation');

// router.post('/signin', login);

// router.post('/signup', createUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUserByIdJoiValidate, getUserById);

router.patch('/users/me', updateUserJoiValidate, updateUser);

router.get('/users/me', getCurrentUser);

router.patch('/users/me/avatar', updateUserAvatarJoiValidate, updateUserAvatar);

module.exports = router;
