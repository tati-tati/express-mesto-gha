const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const { loginJoiValidate, createUserJoiValidate } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const userRouter = require('./usersRoutes');
const cardRouter = require('./cardsRoutes');

// роуты

router.post('/signin', loginJoiValidate, login);
router.post('/signup', createUserJoiValidate, createUser);
router.use(auth);

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
