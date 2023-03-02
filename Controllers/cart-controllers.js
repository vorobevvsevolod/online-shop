const {getCartDB, addProductInCartDB, deleteProductInCartDB, updateQuantityCartDB, deleteItemCartUserDB} = require("../DataBase/cartDB");


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
        const id = req.params.id;
        deleteProductInCartDB(id, req.idUser)
            .then(result =>{
                if(result) res.json(result)
                else res.status(500).json('Товар не найден');
            })
    }catch (e){ res.status(500).json('ошибка');}
}

const updateQuantityCart = (req, res) =>{
    try{
        updateQuantityCartDB(req.params.id, req.idUser, req.body.quantity)
        .then(result =>{
            if(result) res.json(result)
                else res.status(500).json('Товар не найден');
        })
    }catch (e){ res.status(500).json('ошибка');}
}

const deleteCartUser = (req, res) => {
    try {
      getCartDB(req.idUser)
        .then((result) => {
          const promises = result.map((cart) => {
            return deleteProductInCartDB(cart.product_id, req.idUser);
          });
          Promise.all(promises)
            .then((results) => {
              let result = false;
              results.map(res => result = res)
              if(result) res.json({result}); else res.status(500).json('Ошибка');
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json('Ошибка');
            });
        });
    } catch (e) {
      console.error(e);
      res.status(500).json('Ошибка');
    }
  };
  


module.exports ={
    getCartUsers:getCartUsers,
    addProductInCart: addProductInCart,
    deleteProductInCart: deleteProductInCart,
    updateQuantityCart:updateQuantityCart,
    deleteCartUser:deleteCartUser 
}