const mongoose = require('mongoose');
const User = require('./models/user.model');
const Post = require('./models/post.model');
require('dotenv').config();

module.exports = async function main(callback) {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const database = mongoose.connection;

        database.on('error', console.error.bind(console, 'conection error'));
        
        database.once('open', () => {
            console.log('Connection succesfull');
        });

        await User.deleteMany();
        await Post.deleteMany();

        callback();

    } catch(e) {
        console.error(e);
        throw new Error('Unable to connect to database.')
    }
};