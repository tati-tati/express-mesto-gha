const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    const card = await Card.create({ name, link, owner: req.user._id });
    if (!card) {
      res.status(404).send({ message: 'Карточка не создана' });
      return;
    }
    res.status(201).send(card);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка' });
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
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка' });
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
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
