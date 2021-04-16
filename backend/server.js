require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const myDataBase = require('./connection');

const cors = require('cors');

app.use(cors());
app.use(express.urlencoded());
app.use(express.static('../public'));

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        lowercase: true,
        trim: true,
        minLength: 8,
        required: true,
        unique: true },
    password: { 
        type: String,
        minLength: 8,
        required: true},
    email: { type: String, unique: true }
});

const User = mongoose.model('User', userSchema);

myDataBase(async () => {
    
});

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port ' + process.env.PORT);
});