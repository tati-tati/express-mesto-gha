const router = require('express').Router();
const userRouter = require('./usersRoutes');
const cardRouter = require('./cardsRoutes');

router.use(userRouter);
router.use(cardRouter);

module.exports = router;
