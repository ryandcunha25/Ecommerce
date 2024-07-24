const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Optional for parsing request bodies

// Initialize Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Importing the MongoDB connection
require('./controllers/connection');

// Importing the authentication routes
const authenticationRoutes = require('./controllers/authentication');
app.use(authenticationRoutes);

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
