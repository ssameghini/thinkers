require('dotenv').config();
const mongoose = require('mongoose');

async function main(callback) {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const database = mongoose.connection;

        database.on('error', console.error.bind(console, 'conection error'));
        
        database.once('open', await callback);
    } catch(e) {
        console.error(e);
        throw new Error('Unable to connect to database.')
    } finally {
        await mongoose.disconnect(() => { console.log('Connection closed.')});
    }
}

module.exports = main;