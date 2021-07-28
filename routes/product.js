const express = require('express');
const router = express.Router();
const product = require('../controllers/product');
const asyncHandler = require('express-async-handler');

router.route('/')
    .get(asyncHandler(product.GetAllProducts))
    .post(asyncHandler(product.AddProduct));

router.route('/:id')
    .get(asyncHandler(product.GetProductByID))
    .put(asyncHandler(product.UpdateProduct))
    .delete(asyncHandler(product.DeleteProduct));

module.exports = router;