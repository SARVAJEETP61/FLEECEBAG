const mongoose = require('mongoose');


const cartItemSchema = new mongoose.Schema({
    item_id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    discount: { type: String, required: true },
    price: { type: String, required: true },
    discountedPrice: { type: String, required: true },
    isNew: { type: Boolean, required: true },
    isInOffer: { type: Boolean, required: true },
    isItBestDeal: { type: Boolean, required: true },
    image: { type: String, required: true }
});


const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    item: [cartItemSchema]
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart; 