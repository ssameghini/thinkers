const mongoose = require('mongoose');

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

module.exports = User;