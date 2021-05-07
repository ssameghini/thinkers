const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');

module.exports = function (passport) {
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
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, (err, user) => {
            if (err) console.log(err);
            const userInfo = {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            };
            done(err, userInfo);
        });
    });
};