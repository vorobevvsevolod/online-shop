const {getFavoritesUserDB, addProductInFavoritesDB, deleteProductInFavoritesDB} = require("../DataBase/favoritesDB");

const getFavoritesUser = (req, res) =>{
    try {
        getFavoritesUserDB(req.idUser).then(result => res.json(result))
    }catch (e){ res.status(500).json('ошибка сервера') }
}
const addProductInFavorites = (req, res) =>{
    try{
        addProductInFavoritesDB(req.idUser, req.body.productId)
            .then(result =>{
                if(result)  res.json(result)
                else res.status(500).json('товар не добавлен в избранные');
            })
    }catch (e){ res.status(500).json('ошибка сервера');}
}

const deleteProductInFavorites = (req, res) =>{
    try{
        deleteProductInFavoritesDB(req.body.favoritesItemId, req.idUser)
            .then(result =>{
                if(result)  res.json(result)
                else res.status(500).json('избранный товар не найден');
            })
    }catch (e){ res.status(500).json('ошибка сервера');}
}



module.exports ={
    getFavoritesUser:getFavoritesUser,
    addProductInFavorites: addProductInFavorites,
    deleteProductInFavorites: deleteProductInFavorites
}