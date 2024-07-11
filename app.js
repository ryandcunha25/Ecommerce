const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser'); // Optional for parsing request bodies
const bcrypt = require('bcrypt'); // For hashing passwords
const User = require('./models/userModel.js'); // Assuming your User model is defined in a separate file

// Initialize Express app
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Connecting to MONGO DB
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

// Define a route to create a new user
app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid email or password")
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid email or password")
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // If the password matches, login is successful
        console.log("User logged in successfully\n" + user);

        // Redirecting to the home page after successful signup
        res.redirect('/index.html'); 
        // res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});


// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
