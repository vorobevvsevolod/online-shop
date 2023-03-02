const { LoginDB, RegistrationDB,  GetInfoUserDB, changeEmailUserDB, changeUsernameUserDB, changePhoneUserDB } = require("../DataBase/usersDB");
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
        GetInfoUserDB(req.idUser).then(result => {
            if(result){
                const {email, username, phone} = result;
                res.json({
                    email: email,
                    username: username,
                    phone: phone
                })
            }else res.status(403).json('пользователь не найден')

      });
    }catch (error){
        res.status(403).json('ошибка');
    }
}

const changeEmailUser = (req, res) =>{
    try{
        changeEmailUserDB(req.idUser, req.body.email).then(result =>{
            res.json({
                result
            })
        })
    }catch (error){
        res.status(403).json('ошибка');
    }
}
const changeUsernameUser = (req, res) =>{
    try{
        changeUsernameUserDB(req.idUser, req.body.username).then(result =>{
            res.json({
                result
            })
        })
    }catch (error){
        res.status(403).json('ошибка');
    }
}

const changePhoneUser = (req, res) =>{
    try{
        changePhoneUserDB(req.idUser, req.body.phone).then(result =>{
            res.json({
                result
            })
        })
    }catch (error){
        res.status(403).json('ошибка');
    }
}

module.exports = {
    Registration,
    Login,
    GetInfoUser,
    changeEmailUser,
    changeUsernameUser,
    changePhoneUser
}