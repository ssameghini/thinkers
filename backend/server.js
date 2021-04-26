require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const store = new MongoStore({ url: process.env.MONGO_URI });

// Authenticators and Routers
const main = require('./connection');
const auth = require('./auth');
const router = require('./routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
    key: 'thinkers.id',
    store: store
}));

app.use(passport.initialize());
app.use(passport.session());


main(async function() {
    await auth();
    app.use('/', router);
    
}).catch(e =>{
    console.log(e);
});

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port ' + process.env.PORT);
});