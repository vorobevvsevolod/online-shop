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

function deleteProductInCartDB(ProductID, userId){
    return client.query(`DELETE FROM cart WHERE product_id = $1 AND user_id = $2`, [ProductID, userId])
        .then(result => {
            if (result.rowCount === 0) return false
             else return true
        })
        .catch(err => console.error(err));
}

function updateQuantityCartDB (productId, userId, quantity){
    return client.query(`UPDATE cart SET quantity = $1 WHERE product_id = $2 AND user_id = $3`, [quantity, productId, userId])
    .then(result => {
        if (result.rowCount === 0) return false
         else return true
    })
    .catch(err => console.error(err));
}

module.exports = {
    getCartDB: getCartDB,
    addProductInCartDB: addProductInCartDB,
    deleteProductInCartDB: deleteProductInCartDB,
    updateQuantityCartDB:updateQuantityCartDB
}