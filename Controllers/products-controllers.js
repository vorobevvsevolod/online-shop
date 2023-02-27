const { getProductsDB, getProductsByIdDB, addProductsDB, getImageDB, updateProductImageURL, getCountProductsDB} = require('../DataBase/productsDB');
const saveImage = require("../Utilities/saveImage");

const getProducts = (req, res) =>{
    try{
        getProductsDB(Number(req.query.offset)).then(result => {
            res.json({
                result: result
            })
        })
    }catch (e){
        res.status(500).json('ошибка')
    }
}

const getProductsByID = (req, res) =>{
    try{
        const id = req.params.id;
        getProductsByIdDB(id).then(result => {
            res.json({
                result: result
            })
        })
    }catch (e){
        res.status(500).json('ошибка')
    }
}

const addProducts = (req, res) =>{
    try{
        const product = {
            name: req.body.name,
            price: req.body.price,
            count: req.body.count,
            description: req.body.description
        }
        addProductsDB(product).then(result => {
            if(result){
                const resultUploadImage = saveImage(req.file.path, `${result}.${req.file.mimetype.split('/')[1]}`)
                if(resultUploadImage.flag){
                    updateProductImageURL(result, resultUploadImage.name).then(result=>{
                        if(!result) return res.status(500).json('ошибка');
                        res.json({response: 'Товар успешно добавлен'})
                    })
                }else return res.status(500).json('ошибка загрузки изображения');
            }else return res.status(500).json('ошибка добавления в БД');
        })
    }catch (e){
        res.status(500).json('ошибка со стороны сервера')
    }
}

const getImage = (req, res) =>{
    try{
        const id = req.params.id;
        getImageDB(id, res);
    }catch (e){
        res.status(500).json('ошибка')
    }
}

const getCountProducts = (req, res) =>{
    try {
        
        getCountProductsDB().then(result =>{
            res.json({count: result})
        })
    } catch (e) {
        res.status(500).json('ошибка')
    }

}

module.exports ={
    getProducts: getProducts,
    getProductsByID:getProductsByID,
    addProducts: addProducts,
    getImage:getImage,
    getCountProducts: getCountProducts
}


