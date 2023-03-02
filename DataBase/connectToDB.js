const {Client} = require('pg');
const client = new Client({
    host:'dpg-cg0fpqt269vcmnfrqvug-a.oregon-postgres.render.com',
    user:'postgres_vsevolod',
    password: 'YfUu9xGuyVM5PBttMKAownF84zGcB7QM',
    database: 'magazin'
})
client.connect()
    .then(() => console.log('Подключение к БД успешно'))
    .catch(err => console.error('Ошибка подключения к PostgreSQL', err));


module.exports = {client};