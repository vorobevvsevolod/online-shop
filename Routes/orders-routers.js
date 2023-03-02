const express = require('express');
const router = express.Router();
const { getOrdersUser, addOrderUser, getOrderProductsUser } = require('../Controllers/orders-controllers');
const {AutorizationValidator} = require("../Validate/userValidator");

router.get('/orders', (req, res, next)=>{
    if(req.body.phone) next(); else{
        if(req.headers.authorization) {
            AutorizationValidator(req.headers.authorization).then(result =>{
                if(result.flag)
                    req.idUser = result.id;
                else return res.status(400).json( 'Ошибка авторизации');
                next();
            })
        } else return res.status(400).json( 'Ошибка авторизации');
    }
});
router.get('/orders', getOrdersUser )

router.get('/order/products/:id', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});
router.get('/order/products/:id', getOrderProductsUser )

router.post('/order', (req, res, next)=>{
    if(req.body.phone) next(); else{
        if(req.headers.authorization) {
            AutorizationValidator(req.headers.authorization).then(result =>{
                if(result.flag)
                    req.idUser = result.id;
                else return res.status(400).json( 'Ошибка авторизации');
                next();
            })
        } else return res.status(400).json( 'Ошибка авторизации');
    }
    
});
router.post('/order',  addOrderUser)




module.exports = router;