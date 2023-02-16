const {Client} = require('pg');
const client = new Client({
    host:'localhost',
    port: 5000,
    user:'postgres',
    password: '31122003',
    database: 'magizin'
})
const getTime = require('../Utilities/getTime')
client.connect()
    .catch(err => console.error('Ошибка подклбчения к PostgreSQL', err))


function LoginDB(email, password) {
    return client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
        .then(result => {
            return (result.rows[0]) ? result.rows[0].username : result.rows;
        })
        .catch(err => {
            console.error(err);
        });
}
function RegistrationDB (username, email, password) {
    return client.query('INSERT INTO users (username, email, password, datacreate) VALUES ($1, $2, $3, $4)', [username, email, password, getTime()])
        .then(result => {
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err.constraint);
            return err.constraint;
        });
}
function GetInfoUserDB(email) {
    return client.query('SELECT * FROM users WHERE email = $1', [email])
        .then(result => {
            return result.rows;
        })
        .catch(err => {
            return err;
        });
}



module.exports = {
    LoginDB: LoginDB,
    RegistrationDB: RegistrationDB,
    GetInfoUserDB: GetInfoUserDB
};