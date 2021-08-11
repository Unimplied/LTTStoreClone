const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true}
});

const productSchema = new Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, required: true, default: 0},
    category: {type: String, required: true},
    description: {type: String, required: true},
    reviews: [reviewSchema],
    rating: {type: Number, required: true, default: 0},
    numReviews: {type: Number, required: true, default: 0},
    countInStock: {type: Number, required: true, default: 0},
    image: {type: String, required: true},
    // user: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }
});

module.exports = mongoose.model('Product', productSchema);