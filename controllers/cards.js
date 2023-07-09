const Card = require('../models/card');
const { errorWrongData, errorNotFound, errorServerFailed } = require('../utils/constants');
const CustomError = require('../utils/errors');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    errorServerFailed(res);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      errorWrongData(res);
      return;
    }
    const card = await Card.create({ name, link, owner: req.user._id });
    if (!card) {
      errorNotFound(res);
      return;
    }
    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    errorServerFailed(res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      errorNotFound(res);
      return;
    }
    console.log(card.owner !== req.user._id);
    if (card.owner !== req.user._id) {
      throw new CustomError(404, 'Нет прав на удаление');
    }
    await card.deleteOne();
    res.send({ message: 'Карточка успешно удалена' });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    errorServerFailed(res);
  }
};

const putLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      errorNotFound(res); return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    errorServerFailed(res);
  }
};

const deleteLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      errorNotFound(res);
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      errorWrongData(res);
      return;
    }
    errorServerFailed(res);
  }
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
