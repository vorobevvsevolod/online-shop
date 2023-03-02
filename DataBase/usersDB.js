const getTime = require('../Utilities/getTime')
const {client} = require('./connectToDB')
function LoginDB(email, password) {
    return client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
        .then(result => {
            return (result.rows[0]) ? result.rows[0].id : false;
        })
        .catch(err => {
            console.error(err);
        });
}

function RegistrationDB (username, email, password) {
    return client.query('INSERT INTO users (username, email, password, datacreate) VALUES ($1, $2, $3, $4) ', [username, email, password, getTime()])
        .then(result => {
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err.constraint);
            return err.constraint;
        });
}

function GetInfoUserDB(id) {
    return client.query('SELECT * FROM users WHERE id = $1', [id])
        .then(result => {
            return result.rows[0];
        })
        .catch(err => {
            return err;
        });
}

function searchUserByIdDB (id){
    return client.query('SELECT * FROM users WHERE id = $1', [id])
        .then(result => { return result.rowCount > 0})
        .catch(err => {  console.error(err); });
}

function changeEmailUserDB (id, email){
    return client.query('UPDATE users SET email = $1 WHERE id = $2', [email, id])
        .then(result => {
            if (result.rowCount === 0)
                throw new Error(`Пользователь не найден`);
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err);
        });
}
function changeUsernameUserDB (id, username){
    return client.query('UPDATE users SET username = $1 WHERE id = $2', [username, id])
        .then(result => {
            if (result.rowCount === 0)
                throw new Error(`Пользователь не найден`);
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err);
        });
}
function changePhoneUserDB (id, phone){
    return client.query('UPDATE users SET phone = $1 WHERE id = $2', [phone, id])
        .then(result => {
            if (result.rowCount === 0)
                throw new Error(`Пользователь не найден`);
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = {
    LoginDB: LoginDB,
    RegistrationDB: RegistrationDB,
    GetInfoUserDB: GetInfoUserDB,
    searchUserByIdDB:searchUserByIdDB,
    changeEmailUserDB: changeEmailUserDB,
    changeUsernameUserDB:changeUsernameUserDB,
    changePhoneUserDB:changePhoneUserDB
};