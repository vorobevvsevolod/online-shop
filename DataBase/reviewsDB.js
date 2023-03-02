const {client} = require('./connectToDB');
const getTime = require('../Utilities/getTime')
function getReviewsProductByIdDB(id){
    return client.query('SELECT * FROM reviews WHERE product_id = $1', [id])
        .then(result => {
            return result.rows;
        })
        .catch(err => {
            console.error(err);
        });
}

function addReviewsProductByIdDB(product_id, rating, text, author){
    return client.query('INSERT INTO reviews(product_id, rating, text, time, author) VALUES($1, $2, $3, $4, $5)', [product_id, rating, text, getTime(), author])
        .then(result => {
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err);
        });
}

function getProductAVGRatingByIdDB(id){
    return client.query('SELECT AVG(rating), COUNT(*) FROM reviews WHERE product_id = $1', [id])
        .then(result => {
            return result.rows[0];
        })
        .catch(err => {
            console.error(err);
        });
}




module.exports ={
    getReviewsProductByIdDB: getReviewsProductByIdDB,
    addReviewsProductByIdDB:addReviewsProductByIdDB,
    getProductAVGRatingByIdDB: getProductAVGRatingByIdDB
}