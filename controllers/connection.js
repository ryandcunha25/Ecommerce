const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce_db');

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log("Mongo DB has been connected");
});
connection.on('error', (e) => {
    console.error('MongoDB connection error:', e);
});

module.exports = connection;
