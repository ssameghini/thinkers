const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user.model');

module.exports = async function auth() {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (err) {
                console.log(err);
                done('Unauthorized');
            }
            return done(null, user);
        });
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, (err, user) => {
                if (err) { return done(err); } 
                else if (!user) { return done(null, false, { message: 'User not found'}); }
                else if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password'});
                } else { return done(null, user); }
            });
        }
    ));
};