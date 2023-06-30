const router = require('express').Router();
const userRouter = require('./usersRoutes');
const cardRouter = require('./cardsRoutes');

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
