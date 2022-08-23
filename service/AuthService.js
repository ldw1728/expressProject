
const bcrypt = require('bcryptjs');// password 암호화
const jwt = require('jsonwebtoken'); //jwt

module.exports = (User) => { //function의 매개변수를이용한 의존성 주입.

    const userService = {};
    
    
    userService.userWithEncodePassword = async ({email, password, name, birth, phon, reg_dt}) => {
    
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
    userService.createUser = async (userInput) => {
        const user = await userService.userWithEncodePassword(userInput);
        return user.save();
    }

    //userId token 생성
    userService.createToken = (userId) => {
        const token = jwt.sign({_id: userId.toString()}, bcrypt.genSalt().toString());
        return token;
    }

    //passwordCheck
    userService.pwCheck = async(password, userPassword) => {
        const check = await bcrypt.compare(password, userPassword);
        return check;
    }
    


    return userService;
}

