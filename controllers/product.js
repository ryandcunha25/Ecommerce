const express = require('express');
const router = express.Router();
const Product = require('../models/productsModel');
const { createOrder, verifyPayment } = require('./razorpay');

// Route to add a product
router.post('/add', async (req, res) => {
    const { name, price, id, category, brand } = req.body;
    const product = new Product({ name, price, id, category, brand });
    try {
        await product.save();
        res.status(200).send('Product added successfully');
    } catch (error) {
        res.status(500).send('Error adding product: ' + error.message);
    }
});

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('Error retrieving products: ' + error.message);
    }
});

// Razorpay routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

module.exports = router;
