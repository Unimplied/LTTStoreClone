const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems:[{
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: String, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }],
});

module.exports = mongoose.model('Order', orderSchema);