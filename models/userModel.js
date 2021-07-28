const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    purchases: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        }
    ],
    shoppingCart: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        }
    ],
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: Boolean,
    emailToken: String
});

userSchema.plugin(passportLocalMongoose); // Passport adds on username, password, ensures uniqueness of usernames

module.exports = mongoose.model('User', userSchema);