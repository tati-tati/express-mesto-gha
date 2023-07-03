const errorWrongData = (res) => { res.status(400).send({ message: 'Переданы некорректные данные' }); };
const errorNotFound = (res) => { res.status(404).send({ message: 'Данные не найдены' }); };
const errorServerFailed = (res) => { res.status(500).send({ message: 'Произошла ошибка' }); };

module.exports = { errorWrongData, errorNotFound, errorServerFailed };
