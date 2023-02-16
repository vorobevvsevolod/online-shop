const {body} = require("express-validator");
const registrationValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({min: 5}),
    body('username', "Имя должно быть минимум 3 символа").isLength({min: 3})
]
const LoginValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 5 символов").isLength({min: 5})
]
module.exports = {
    registrationValidator: registrationValidator,
    LoginValidator:LoginValidator
}