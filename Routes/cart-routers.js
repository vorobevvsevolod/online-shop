const {getCartUsers, addProductInCart, deleteProductInCart, updateQuantityCart} = require("../Controllers/cart-controllers");
const express = require('express');
const router = express.Router();
const {AutorizationValidator} = require("../Validate/userValidator");

//Получение корзины
router.get('/cart', (req, res, next)=>{
    AutorizationValidator(req.headers.authorization).then(result =>{
        if(result.flag)
            req.idUser = result.id;
        else return res.status(400).json( 'Ошибка авторизации');
        next();
    });
});
router.get('/cart', getCartUsers)

//Добавление товара в корзину
router.post('/cart', (req, res, next)=>{
    AutorizationValidator(req.headers.authorization).then(result =>{
        if(result.flag)
            req.idUser = result.id;
        else return res.status(400).json( 'Ошибка авторизации');
        next();
    });
});
router.post('/cart', addProductInCart)

router.post('/cart/quantity/:id', (req, res, next)=>{
    AutorizationValidator(req.headers.authorization).then(result =>{
        if(result.flag)
            req.idUser = result.id;
        else return res.status(400).json( 'Ошибка авторизации');
        next();
    });
});
router.post('/cart/quantity/:id', updateQuantityCart)

//Удаление товара из корзины
router.delete('/cart/:id', (req, res, next)=>{
    AutorizationValidator(req.headers.authorization).then(result =>{
        if(result.flag){
            req.idUser = result.id;
            
        }
        else return res.status(400).json( 'Ошибка авторизации');
        next();
    });
});
router.delete('/cart/:id', deleteProductInCart)


module.exports = router;