const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true

    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: { 
        type: String 
    }
});

module.exports = mongoose.model('Product', productSchema);
