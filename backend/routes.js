const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('./models/user.model');
const Post = require('./models/post.model');

module.exports = function routing(passport) {
    router.route('/auth').get((req, res, next) => {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.json(null);
        }
    });

    router.route('/register').post((req, res, next) => {
        console.log(req.body);
        User.findOne({ username: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send("User already exists");
            if (!doc) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword
                });

                newUser.save()
                    .then(user => {
                        req.logIn(user);
                        res.json(req.user);
                    })
                    .catch(e => console.log(e))
            }
        })
        .catch(e => console.log(e));
    });

    router.route('/login').post((req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { throw err }
            else if (!user) { res.send('No user found') }
            else if (user) {
                res.send('Successfully authenticated');
                console.log(req.user);
            }
        })(req, res, next);
    });

    router.route('/logout').get((req, res, next) => {
        req.logOut();
        req.session = null;
        res.redirect('/');
    });

    return router;
};