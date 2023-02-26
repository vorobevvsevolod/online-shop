const {client} = require('./connectToDB')

function getFavoritesUserDB(id){
    return client.query(`SELECT id, product_id FROM favorites WHERE user_id = $1;`, [id])
        .then(result => { return result.rows; })
        .catch(err => { console.error(err); });
}

function addProductInFavoritesDB(userId, productId){
    return client.query(`INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING id `, [userId, productId])
        .then(result => { return result.rows[0].id})
        .catch(err => console.error(err));
}

function deleteProductInFavoritesDB(favoritesItemId, userId){
    return client.query(`DELETE FROM favorites WHERE product_id = $1 AND user_id = $2`, [favoritesItemId, userId])
        .then(result => {
            if (result.rowCount === 0) return false
            else return true
        })
        .catch(err => console.error(err));
}

module.exports = {
    getFavoritesUserDB: getFavoritesUserDB,
    addProductInFavoritesDB: addProductInFavoritesDB,
    deleteProductInFavoritesDB: deleteProductInFavoritesDB
}