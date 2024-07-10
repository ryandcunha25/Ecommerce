// app.js (or index.js)

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser'); // Optional for parsing request bodies
const User = require('./models/userModel.js'); // Assuming your User model is defined in a separate file

// Initialize Express app
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'pages')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Define a route to create a new user
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({
        name,
        email,
        password
    });

    // Save the user to the database
    newUser.save()
        .then(savedUser => {
            res.status(201).json(savedUser); // Respond with the saved user object
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to save user' });
        });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
