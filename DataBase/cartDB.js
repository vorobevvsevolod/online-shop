const {client} = require('./connectToDB')


function getCartDB(id){
    return client.query(`SELECT id, product_id, quantity FROM cart WHERE user_id = $1;`, [id])
        .then(result => { return result.rows; })
        .catch(err => { console.error(err); });
}

function addProductInCartDB(userId, productId, quantity){
    return client.query(`INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id `, [userId, productId, quantity])
        .then(result => { return result.rows[0].id})
        .catch(err => console.error(err));
}

function deleteProductInCartDB(cartItemId, userId){
    return client.query(`DELETE FROM cart WHERE id = $1 AND user_id = $2`, [cartItemId, userId])
        .then(result => {
            if (result.rowCount === 0) return false
             else return true
        })
        .catch(err => console.error(err));
}

module.exports = {
    getCartDB: getCartDB,
    addProductInCartDB: addProductInCartDB,
    deleteProductInCartDB: deleteProductInCartDB
}