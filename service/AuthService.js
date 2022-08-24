
const bcrypt = require('bcryptjs');// password 암호화
const jwt = require('jsonwebtoken'); //jwt

module.exports = (User) => { //function의 매개변수를이용한 의존성 주입.

    const authService = {};
    
    
    authService.userWithEncodePassword = async ({email, password, name, birth, phon, reg_dt}) => {
    
        const hashedPassword = await bcrypt.hash(password, 12); //password 암호화
    
        return new User({
            email, 
            password : hashedPassword, 
            name, 
            birth,
            phon
        });
    }

    // create User
    authService.createUser = async (userInput) => {
        const user = await authService.userWithEncodePassword(userInput);
        return user.save();
    }

    //userId token 생성
    authService.createToken = (userId) => {
        const token = jwt.sign({_id: userId.toString()}, prop.getValue('auth.jwt.key'), {expiresIn:'10m'});
        return token;
    }

    //passwordCheck
    authService.pwCheck = async(password, userPassword) => {
        const check = await bcrypt.compare(password, userPassword);
        return check;
    }
    


    return authService;
}

// 토큰 검증.
exports.tokenVerify = (token) => {
    let decode = jwt.verify(token, prop.getValue('auth.jwt.key'));
    return decode;
}