const {tokenVerify} = require('../service/AuthService');

module.exports = (req, res, next) => {

    //jwt 검증.
    const decode = tokenVerify(req.cookie.token);
    
    if(decode){
        console.log('auth pass');
        req.user = decode;
    }
    else {
        console.log('auth expire');
        res.redirect('/login');
    }
    next();
}