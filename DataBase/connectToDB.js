const {Client} = require('pg');
const client = new Client({
    host:'localhost',
    port: 5432,
    user:'postgres',
    password: '31122003',
    database: 'magazin'
})
client.connect()
    .then(() => console.log('Подключение к БД успешно'))
    .catch(err => console.error('Ошибка подключения к PostgreSQL', err));


module.exports = {client};