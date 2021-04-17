const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: Date
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;