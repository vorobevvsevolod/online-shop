const express = require('express');
const router = express.Router();
const {getFavoritesUser, addProductInFavorites, deleteProductInFavorites} = require("../Controllers/favorites-controllers");
const {AutorizationValidator} = require("../Validate/userValidator");

//Получение избранных
router.get('/favorites', (req, res, next)=>{
    AutorizationValidator(req.headers.authorization).then(result =>{
        if(result.flag)
            req.idUser = result.id;
        else return res.status(400).json( 'Ошибка авторизации');
        next();
    });
});
router.get('/favorites', getFavoritesUser)

//Добавление товара в избранные
router.post('/favorites', (req, res, next)=>{
    AutorizationValidator(req.headers.authorization).then(result =>{
        if(result.flag)
            req.idUser = result.id;
        else return res.status(400).json( 'Ошибка авторизации');
        next();
    });
});
router.post('/favorites', addProductInFavorites)

//Удаление товара из избранных
router.delete('/favorites', (req, res, next)=>{
    AutorizationValidator(req.headers.authorization).then(result =>{
        if(result.flag)
            req.idUser = result.id;
        else return res.status(400).json( 'Ошибка авторизации');
        next();
    });
});
router.delete('/favorites', deleteProductInFavorites)


module.exports = router;