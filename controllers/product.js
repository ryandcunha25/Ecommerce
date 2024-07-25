const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Add a new product
router.post('/products', async (req, res) => {
    try {
        const { name, price, brand, id, image } = req.body;
        const newProduct = new Product({ name, price, brand, id, image });
        await newProduct.save();
        res.status(201).send(newProduct);
        req.app.get('io').emit('newProduct', newProduct); // Notify clients of the new product
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
