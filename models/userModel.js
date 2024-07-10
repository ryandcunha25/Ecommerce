const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce_db', {
    useNewUrlParser: true,
    // useFindAndModify: false // Avoid deprecated warnings
});

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log("Mongo DB has been connected");
});
connection.on('error', (e) => {
    console.error('MongoDB connection error:', e);
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
