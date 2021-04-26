const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('./models/user.model');
// const Post = require('./models/post.model');

router.route('/').get(async (req, res) => {
    console.log(req.session);
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.json('/auth');
    }
});

router.route('/register').post(async (req, res, next) => {
    let { firstName, lastName, email, username, password } = req.body;

    User.findOne({ $or: [{ username }, { email }]}, async (err, user) => {
        console.log(user);
        if (err) {
            res.json(err);
        } else if (user.username) {
            res.json('Username or email already registered.');
        } else {
            const hash = await bcrypt.hash(password, 12).catch(e => res.json(e.name));
            const user = new User({
                firstName,
                lastName,
                email,
                username,
                password: hash
            });
            await user.save()
                .catch(e => {
                    res.json(e.name);
                });
            next(user.username, user.password);
        }
    });
},
function(req, res, next ){
    passport.authenticate('local', { failureRedirect: '/register', successRedirect: '/' }, function(err, user, info) {
      if (err) { return res.json(err) }
      if (!user) { return res.json( { message: info.message }) }
      res.json(user);
    })(req, res, next);   
});

router.route('/login').post(
    function(req, res, next ){
        passport.authenticate('local', { failureRedirect: '/', successRedirect: '/' }, function(err, user, info) {
          if (err) { return res.json(err) }
          if (!user) { return res.json( { message: info.message }) }
          res.json(user);
        })(req, res, next);   
    }
);

router.route('/logout').get(
    function(req, res, next) {
        req.logout();
        res.json('Logged out');
        next();
    }
);

module.exports = router;