const { LoginDB, RegistrationDB,  GetInfoUserDB } = require("../DataBase/usersDB");
const hashPassword = require('../Utilities/hashPassword')
const jwt = require('jsonwebtoken');
const SECRET_PASSWORD = require('../server')
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
        const password = req.body.password;
        const passwordHash = hashPassword(password)
        LoginDB(req.body.email, passwordHash).then(result => {
            if(result){
                const token = jwt.sign({
                    email: req.body.email,
                    id: result
                }, SECRET_PASSWORD)
                res.json({
                    token: token,
                })
            }else return res.status(404).json('Пользователь не найден')

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