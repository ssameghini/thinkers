require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const MongoStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');

const app = express();

// --------------------- Mongoose and MongoStore connection ------------------

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'conection error'));
database.once('open', () => {
    console.log('Connection succesfull');
});

const store = new MongoStore({
    uri: uri,
    collection: 'sessions',
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
}, function(error) {
    console.log(error || 'MongoStore connected');
});


// ----------------------------- MIDDLEWARE -----------------------------------

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
const secretKey = 'ssameghini';
app.use(cookieParser(secretKey));
app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
    name: 'thinkers.id',
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());

// ------------------- Passport Authentication and Routing ----------------------
require('./passport-config')(passport);

app.get('/auth', (req, res) => {
    console.log(req.session, req.user);
    if (req.user) {
        res.send(req.user);
    } else {
        res.json(null);
    }
});

app.post('/register', (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User already exists");
        if (!doc) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword
            });

            await newUser.save();
            res.send('User created');
        }
    })
    .catch(e => console.log(e));
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { throw err }
        else if (!user) { res.send('No user found') }
        else if (user) {
            req.logIn(user, (err) => {
                if(err) console.log(err);
                res.send(user);
                console.log(req.session, req.user);
            });
        }
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logOut();
    req.session = null;
    res.clearCookie('thinkers.id');
    res.send('You have logged out successfully');
});


// ------------- Start server ---------------------

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port ' + process.env.PORT);
});