const app = require('express')();
const http = require('http').Server(app);

const mongoose = require('mongoose');

async function connectdb() {
    try {
        const connInstance = await mongoose.connect("mongodb+srv://ryandcunha2812:rd12ad34@cluster0.6mrrkiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        if (connInstance) {
            console.log("Connected to MongoDB")
        }
    } catch (error) {
        console.log(error)
    }
}
connectdb()


const User = require('./models/userModel.js');
const { log } = require('console');

async function insert() {
    await User.create({
        name: "yeshaya vargheese",
        email: "yeshaya@gmail.com",
    }).then((data) => console.log(`DAta inserted successfully ${data}`))
        .catch((err) => console.log("Error occured due to ",err))

}

insert()
http.listen(3000, function () {
    console.log("listening on *:3000");
})
