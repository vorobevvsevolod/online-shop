const {
    Registration,
    Login,
    GetInfoUser
} = require('../controllers/users-controllers');

const express = require('express');
const { validationResult } = require('express-validator')
const {registrationValidator, LoginValidator} = require('../Validate/userValidator')
const router = express.Router();

router.post('/registration', registrationValidator, (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json( errors.array());
    next();
});
router.post('/registration', Registration);

router.get('/auth', LoginValidator, (req,res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json( errors.array());
    next();
});
router.get('/auth', Login);

router.get('/auth/me', (req, res, next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if(!token) return res.status(403).json('нет доступа');
    req.token = token;
    next();
});
router.get('/auth/me', GetInfoUser)

module.exports = router;
