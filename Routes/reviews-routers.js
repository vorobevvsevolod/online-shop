const express = require('express');
const { getReviewsProductByID, addReviewsProductByID } = require('../Controllers/reviews-controllers');
const router = express.Router();



router.get('/product/reviews/:id',  getReviewsProductByID);
router.post('/product/reviews/:id',  addReviewsProductByID);


module.exports = router;