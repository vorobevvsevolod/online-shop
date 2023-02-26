const express = require('express');
const { getReviewsProductByID, addReviewsProductByID, getProductAVGRatingById } = require('../Controllers/reviews-controllers');
const router = express.Router();



router.get('/product/reviews/:id',  getReviewsProductByID);
router.get('/product/reviews/avg/:id',  getProductAVGRatingById);
router.post('/product/reviews/:id',  addReviewsProductByID);


module.exports = router;