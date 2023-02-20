const {body} = require("express-validator");
const decodeToken = require("../Utilities/decodeToken");
const {searchUserByIdDB} = require("../DataBase/usersDB");

const registrationValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({min: 5}),
    body('username', "Имя должно быть минимум 3 символа").isLength({min: 3})
]

const LoginValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({min: 5})
]
const AutorizationValidator = (token) =>{
    const result = decodeToken(token)
    return (result.flag) ?
         searchUserByIdDB(result.id).then(res =>{
            return {flag: res, id: result.id}
        })
        : {flag: false}
}
module.exports = {
    registrationValidator: registrationValidator,
    LoginValidator:LoginValidator,
    AutorizationValidator: AutorizationValidator
}