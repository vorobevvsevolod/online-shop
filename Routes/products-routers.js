const {getProducts, getProductsByID, addProducts, getImage, getCountProducts, searchProducts} = require('../Controllers/products-controllers')
const multer  = require('multer')
const express = require('express');
const router = express.Router();
const upload = multer({ dest: 'uploads/' })
const cors = require('cors')
router.get('/products', cors(), getProducts);
router.get('/product/image/:id', getImage);
router.get('/product/:id', getProductsByID);

router.post('/product', upload.single('image'), (req, res, next) => {
    if (!req.file) return res.status(400).send('Необходимо загрузить изображение');
    next()
})
router.post('/product', addProducts);
module.exports = router;