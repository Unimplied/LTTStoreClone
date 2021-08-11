const express = require('express');
const router = express.Router();
const { addOrderItems, getUserOrders } = require('../controllers/orderController');

router.route('/').post(addOrderItems)
router.route('/myOrders/:id').get(getUserOrders);

module.exports = router;