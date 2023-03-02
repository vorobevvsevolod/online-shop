const {
    Registration,
    Login,
    GetInfoUser,
    changeEmailUser,
    changeUsernameUser,
    changePhoneUser
} = require('../Controllers/users-controllers');

const express = require('express');
const { validationResult } = require('express-validator')
const {registrationValidator, LoginValidator, AutorizationValidator} = require('../Validate/userValidator')
const router = express.Router();

router.post('/registration', registrationValidator, (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json( errors.array());
    next();
});
router.post('/registration', Registration);

router.post('/auth', LoginValidator, (req,res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json( errors.array());
    next();
});
router.post('/auth', Login);

router.get('/auth/me', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});

router.get('/auth/me', GetInfoUser)

router.post('/auth/email', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});
router.post('/auth/email', changeEmailUser);

router.post('/auth/username', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});
router.post('/auth/username', changeUsernameUser);

router.post('/auth/phone', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});
router.post('/auth/phone', changePhoneUser);


module.exports = router;
