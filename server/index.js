const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const todoItemRoute = require('./routes/todoItems')

const app = express();

//for transforming data into JSON format
app.use(express.json());

//cors
app.use(cors());

//port
const PORT = process.env.PORT || 5500;

//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/todoApp')
.then(() => console.log('DATABASE CONNECTED'))
.catch(err => console.log(err))

//Adding port and connecting to server
app.listen(PORT, () => {
    console.log("SERVER CONNECTED")
})


app.use('/', todoItemRoute);