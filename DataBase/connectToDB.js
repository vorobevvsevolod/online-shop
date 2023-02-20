const {Client} = require('pg');
const client = new Client({
    host:'localhost',
    port: 5000,
    user:'postgres',
    password: '31122003',
    database: 'magizin'
})
client.connect()
    .then(() => console.log('Подключение к БД успешно'))
    .catch(err => console.error('Ошибка подключения к PostgreSQL', err));


module.exports = {client};