const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const authService = require('../service/AuthService')(User);


passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    session : false
}, function(email, password, cb){
    return User.findOne({email, password})
        .then(user => {
            if(!user){
                    return cb(null, false, {message:'inccorect email'}); //user없을 시
            }
            const compareRes = authService.pwCheck(password, user.password);
            if(compareRes){
                return cb(null, user, {message:'success login'}); //로그인 성공
            }
            return cb(null, user, {message:'wrong password'}); //password 다를 시
        }).catch(err=>cb(err));
}

));

module.exports = passport;