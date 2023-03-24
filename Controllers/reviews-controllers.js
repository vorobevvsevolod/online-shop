const { getProductsDB, updateRatingProductDB } = require("../DataBase/productsDB")
const { getReviewsProductByIdDB, addReviewsProductByIdDB, getProductAVGRatingByIdDB } = require("../DataBase/reviewsDB")


const getReviewsProductByID = (req, res) =>{
    try{
        getReviewsProductByIdDB(req.params.id).then(response =>{
            res.json({
                response
            })
        })
    }catch (e){
        res.status(500).json('ошибка')
    }
}

const addReviewsProductByID = async (req, res) =>{
    try{
        const product_id = req.params.id;

        const rewies = await addReviewsProductByIdDB(product_id, req.body.rating, req.body.text, req.body.author);
        const rating = await getProductAVGRatingByIdDB(product_id);
        const updateRating = await updateRatingProductDB(product_id, Number(rating.avg).toFixed(2), Number(rating.count))  
            res.json({
                result: rewies
            })
       
    }catch (e){
        console.log(e)
        res.status(500).json('ошибка')
    }
}


module.exports = {
    getReviewsProductByID:getReviewsProductByID,
    addReviewsProductByID:addReviewsProductByID,
}