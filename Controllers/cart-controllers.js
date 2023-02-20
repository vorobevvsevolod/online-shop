const {getCartDB, addProductInCartDB, deleteProductInCartDB} = require("../DataBase/cartDB");


const getCartUsers = (req, res) =>{
    try {
        getCartDB(req.idUser).then(result => res.json(result))
    }catch (e){ res.status(500).json('ошибка') }
}

const addProductInCart = (req, res) =>{
    try{
        addProductInCartDB(req.idUser, req.body.productId, req.body.quantity)
            .then(result =>{
                if(result) res.json(result)
                    else res.status(500).json('ошибка');
            })
    }catch (e){ res.status(500).json('ошибка');}
}

const deleteProductInCart = (req, res) =>{
    try{
        deleteProductInCartDB(req.body.cartItemId, req.idUser)
            .then(result =>{
                if(result) res.json(result)
                else res.status(500).json('Товар не найден');
            })
    }catch (e){ res.status(500).json('ошибка');}
}



module.exports ={
    getCartUsers:getCartUsers,
    addProductInCart: addProductInCart,
    deleteProductInCart: deleteProductInCart
}