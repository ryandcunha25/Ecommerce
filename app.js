const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Optional for parsing request bodies
// const crypto = require('crypto');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');

// Connecting to Mongo DB
 require('./controllers/connection');


// Initialize Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
// app.use(methodOverride('_method'));


// Importing the authentication routes
const authenticationRoutes = require('./controllers/authentication');
app.use(authenticationRoutes);

// // Importing products
// const productRoutes = require('./controllers/product');
// app.use(productRoutes);

// // Setting up gridFS storage
// let gfs;

// connectionDB.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// Importing payments
// const paymentController = require('../controllers/paymentController');

// payment_route.get('/', paymentController.renderProductPage);
// payment_route.post('/createOrder', paymentController.createOrder);

// Starting the server
const port = process.env.PORT || 3000   ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// // WebSocket setup 
// const io = require('socket.io')(server);

// app.set('io', io);

// io.on('connection', (socket) => {
//     console.log('A user connected');
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });