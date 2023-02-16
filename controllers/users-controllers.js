const {
    LoginDB,
    RegistrationDB,
    GetInfoUserDB
} = require("../DataBase/usersDB");

const hashPassword = require('../Utilities/hashPassword')
const jwt = require('jsonwebtoken');
const SECRET_PASSWORD = "vsevolod1234";

const Registration = (req, res) =>{
    try{
        const password = req.body.password;
        const passwordhash = hashPassword(password);

        RegistrationDB(req.body.username, req.body.email, passwordhash)
            .then(result => {
                res.send({
                    status: result
                })
            });
    } catch (e){
        res.status(500).json('ошибка')
    }

}
const Login = (req, res) =>{
    try{
        const token = jwt.sign({
            email: req.body.email,
            username: req.body.username
        }, SECRET_PASSWORD)
        const password = req.body.password;
        const passwordHash = hashPassword(password)
        LoginDB(req.body.email, passwordHash).then(result => {
            res.json({
                token: token,
                result: result,
            })
        });
    }catch (e){
        res.status(500).json('ошибка')
    }

}
const GetInfoUser = (req, res) =>{
    try{
        const decoded =  jwt.verify(req.token, SECRET_PASSWORD);
        GetInfoUserDB(decoded.email).then(result => {
            if(result){
                res.json({
                    success: true,
                    username: result
                })
            }else res.status(403).json('пользователь не найден')

      });
    }catch (error){
        res.status(403).json('нет доступа');
    }
}

module.exports = {
    Registration,
    Login,
    GetInfoUser
}