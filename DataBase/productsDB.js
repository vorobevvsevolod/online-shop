const {client} = require('./connectToDB');
const fs = require('fs');

function getProductsDB(offset, sort, search){
    const limit = 12;
    if(search)
    return client.query(`SELECT * FROM products WHERE id::text ILIKE $1 OR name ILIKE $1 ORDER BY ${sort}, id ASC LIMIT $2 OFFSET $3`, [`%${search}%`, limit, offset])
        .then(result => {
            return result.rows;
        })
        .catch(err => {
            console.error(err);
        });

    return client.query(`SELECT * FROM products ORDER BY ${sort}, id ASC LIMIT $1 OFFSET $2`, [limit, offset])
        .then(result => {
            return result.rows;
        })
        .catch(err => {
            console.error(err);
        });

}


function getProductsByIdDB(id){
    return client.query('SELECT * FROM products WHERE id = $1', [id])
        .then(result => {
            return result.rows;
        })
        .catch(err => {
            console.error(err);
        });
}

function addProductsDB(product){
    return client.query('INSERT INTO products (name, price, count, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING id', 
    [product.name, product.price, product.count, product.description, '/img.jpg'])
        .then(result => {
            return result.rows[0].id;
        })
        .catch(err => {
            console.error(err);
        });
}

function updateProductImageURL(id, imageURL) {
    return client.query('UPDATE products SET image_url = $1 WHERE id = $2', [imageURL, id])
        .then(result => {
            if (result.rowCount === 0)
                throw new Error(`Продукт не найден`);
            return result.rowCount > 0;
        })
        .catch(err => {
            console.error(err);
        });
}

function getImageDB(id, res) {
    return client.query('SELECT image_url FROM products WHERE id = $1', [id])
        .then(result => {
            if (result.rowCount === 0) {
                res.status(404).send('Изображение не найдено');
            } else {
                const imageUrl = result.rows[0].image_url;
                const imageStream = fs.createReadStream(imageUrl);
                imageStream.pipe(res);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).res.json({err})
        });
}

function getCountProductsDB  (value) {
    if(value)
        return client.query('SELECT COUNT(*) FROM products WHERE id::text ILIKE $1 OR name ILIKE $1',[`%${value}%`])
            .then(res => { 
                return res.rows[0].count 
            })
            .catch(err => {
                console.error(err);
            });
    return client.query('SELECT COUNT(*) FROM products')
        .then(res => { 
            return res.rows[0].count 
        })
        .catch(err => {
            console.error(err);
        });
}

function updateQuntityProductsDB  (id, value) {
    return client.query('UPDATE products set count = count - $1 WHERE id = $2', [value, id])
    .then(res => { return res.rowCount > 0})
    .catch(err => {
        console.error(err);
    });
}


function updateRatingProductDB (id, rating, count_reviews) {
    return client.query('UPDATE products SET rating = $1, count_reviews = $2 WHERE id = $3', [rating, count_reviews, id])
    .then(result => {
        if (result.rowCount === 0)
            throw new Error(`Продукт не найден`);
        return result.rowCount > 0;
    })
    .catch(err => {
        console.error(err);
    });
}

module.exports = {
    getProductsDB: getProductsDB,
    getProductsByIdDB: getProductsByIdDB,
    addProductsDB: addProductsDB,
    getImageDB: getImageDB,
    updateProductImageURL:updateProductImageURL,
    getCountProductsDB:getCountProductsDB,
    updateQuntityProductsDB:updateQuntityProductsDB,
    updateRatingProductDB:updateRatingProductDB
}

