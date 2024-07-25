const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js'); // Assuming your User model is defined in a separate file

const router = express.Router();

// Define a route to create a new user
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Saving the user in the database
        const savedUser = await newUser.save();
        console.log("User signed up successfully\n" + savedUser);
        // res.status(201).json(savedUser);
        
        // Redirecting to the login page after successful signup
        res.redirect('/login.html'); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to save user' });
    }
});

// Define a route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        // Finding the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid email or password");
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Comparing the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid email or password");
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // If the password matches, login is successful
        console.log("User logged in successfully\n" + user);

        // Redirecting users with the email containing @admin123.com to the admin panel
        if (email.endsWith('@admin123.com')) {
            return res.redirect('/admin_panel.html');
        }

        // Redirecting to the home page after successful login
        res.redirect('/index.html');
        // res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
