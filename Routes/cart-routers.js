const {getCartUsers, addProductInCart, deleteProductInCart, updateQuantityCart, deleteCartUser} = require("../Controllers/cart-controllers");
const express = require('express');
const router = express.Router();
const {AutorizationValidator} = require("../Validate/userValidator");

//Получение корзины
router.get('/cart', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});
router.get('/cart', getCartUsers)

//Добавление товара в корзину
router.post('/cart', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
     
});
router.post('/cart', addProductInCart)

router.post('/cart/quantity/:id', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});
router.post('/cart/quantity/:id', updateQuantityCart)

//Удаление товара из корзины
router.delete('/cart/:id', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
});
router.delete('/cart/:id', deleteProductInCart)

router.delete('/delete/cart', (req, res, next)=>{
    if(req.headers.authorization) {
        AutorizationValidator(req.headers.authorization).then(result =>{
            if(result.flag)
                req.idUser = result.id;
            else return res.status(400).json( 'Ошибка авторизации');
            next();
        })
    } else return res.status(400).json( 'Ошибка авторизации');
     
});
router.delete('/delete/cart', deleteCartUser)


module.exports = router;