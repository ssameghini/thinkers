const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
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
        required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;