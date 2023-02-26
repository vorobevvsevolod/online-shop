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

const addReviewsProductByID = (req, res) =>{
    try{
        addReviewsProductByIdDB(req.params.id, req.body.rating, req.body.text, req.body.author).then(response =>{
            res.json({
                response
            })
        })
    }catch (e){
        console.log(e)
        res.status(500).json('ошибка')
    }
}


const getProductAVGRatingById = (req, res) =>{
    try{
        getProductAVGRatingByIdDB(req.params.id).then(response =>{
            if(response){
                res.json({ response })
            } else res.json({response: 'нет оценок'})
            
        })
    }catch (e){
        res.status(500).json('ошибка')
    }
}




module.exports = {
    getReviewsProductByID:getReviewsProductByID,
    addReviewsProductByID:addReviewsProductByID,
    getProductAVGRatingById: getProductAVGRatingById
}