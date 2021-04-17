require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const myDataBase = require('./connection');
const routes = require('./routes');
const auth = require('./auth');
const User = require('./models/user.model');
const Post = require('./models/post.model');

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded());
app.use(express.static('../public'));

myDataBase(async (User) => {
    auth(app, )
    routes(app, );
});

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port ' + process.env.PORT);
});