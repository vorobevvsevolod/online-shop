const { getOrdersUserDB, addOrderUserDB, addOrdersProductsUserDB, getOrderProductsUserDB } = require("../DataBase/ordersDB")
const { updateQuntityProductsDB } = require("../DataBase/productsDB")


const getOrdersUser = (req, res) =>{
    try {
        getOrdersUserDB((req.body.phone) ?req.body.phone : req.idUser).then(result => res.json(result))
    }catch (e){ res.status(500).json('ошибка') }
}

const getOrderProductsUser = (req, res) =>{
    try {
        getOrderProductsUserDB(req.params.id).then(result => res.json(result))
    }catch (e){ res.status(500).json('ошибка') }
}

const addOrderUser = (req, res) =>{
    try {
        const productsArray = req.body.products;
        addOrderUserDB((req.body.phone) ?req.body.phone : req.idUser, req.body.total_cost, req.body.adress).then(result => {
            
            let promises = productsArray.map(product =>{
                updateQuntityProductsDB(product.id, product.quantity)
                return addOrdersProductsUserDB(result, product.id, product.quantity).then(resultProducts => {
                    return resultProducts
                })
            })

            Promise.all(promises).then(resultPromises =>{
                let resultOrdersProducts;
                resultPromises.map(item => resultOrdersProducts = item)
                if(resultOrdersProducts){
                    res.json({result: resultOrdersProducts, id: result})
                }else res.status(500).json('ошибка')
            }) 
        })
    }catch (e){ res.status(500).json('ошибка') }
}






module.exports = {
    getOrdersUser,
    addOrderUser,
    getOrderProductsUser
}