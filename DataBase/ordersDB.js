const getTime = require('../Utilities/getTime');
const {client} = require('./connectToDB')


function getOrdersUserDB (id) {
    return client.query(`SELECT order_id, status, total_cost, date, adress FROM orders WHERE user_id = $1 ORDER BY date DESC`, [id])
            .then(result => { return result.rows; })
            .catch(err => { console.error(err); });
}

function getOrderProductsUserDB (order_id) {
    return client.query(`SELECT product_id, quantity FROM order_products WHERE order_id = $1`, [order_id])
            .then(result => { return result.rows; })
            .catch(err => { console.error(err); });
}



function addOrderUserDB (id, total_cost, adress) {
    return client.query('INSERT INTO orders (user_id, status, total_cost, date, adress) VALUES ($1, $2, $3, $4, $5) RETURNING order_id', [id, 'В обработке', total_cost, getTime(), adress])
            .then(result => { return result.rows[0].order_id; })
            .catch(err => { console.error(err); });
}

function addOrdersProductsUserDB (order_id, product_id, quantity) {
    return client.query('INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)', [order_id, product_id, quantity ])
            .then(result => { return result.rowCount > 0; })
            .catch(err => { console.error(err); });
}



module.exports ={
    getOrdersUserDB: getOrdersUserDB,
    addOrderUserDB: addOrderUserDB,
    addOrdersProductsUserDB:addOrdersProductsUserDB,
    getOrderProductsUserDB:getOrderProductsUserDB
}