// const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { PORT = 3000} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users',(req, res) => {}); // создаём сервер

app.listen(PORT, () => {
  console.log('Сервер работает')
});