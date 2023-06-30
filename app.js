const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  family: 4,
});

app.use((req, res, next) => {
  req.user = {
    _id: '649f3b0fc061685840048f22', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log('Сервер работает');
});
