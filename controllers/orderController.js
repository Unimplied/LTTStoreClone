const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

module.exports.addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems } = req.body
    console.log(req.body);

    if(orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items'})
    } else; {
        const order = new Order({
            orderItems,
            user: req.body.user
        })

        const createdOrder = await order.save();

        res.status(201).json({ createdOrder});
    }
})

module.exports.getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.params.id });

    res.json(orders)
})
