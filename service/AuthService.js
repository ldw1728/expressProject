
const bcrypt = require('bcryptjs');// password 암호화
const jwt = require('jsonwebtoken'); //jwt
const User = require('../models/User.js');

module.exports = {

    userWithEncodePassword: async ({email, password, name, birth, phon, reg_dt}) => {
    
        const hashedPassword = await bcrypt.hash(password, 12); //password 암호화
    
        return new User({
            email, 
            password : hashedPassword, 
            name, 
            birth,
            phon
        });
    },
    createUser: async (userInput) => {
        const user = await authService.userWithEncodePassword(userInput);
        return user.save();
    },

     //userId token 생성
     createToken : (userId) => {
        const token = jwt.sign({_id: userId.toString()}, prop.getValue('auth.jwt.key'), {expiresIn:'10m'});
        return token;
    },

    //passwordCheck
     pwCheck : async (password, userPassword) => {
        const check = await bcrypt.compare(password, userPassword);
        return check;
    },

    tokenVerify : async(token, cb) => {
        let decode = await jwt.verify(token, prop.getValue('auth.jwt.key'), (err, decoded)=>{
            if(cb !== null && cb !== 'undefined'){ //콜백함수 존재시 실행.
                if(err){
                    cb(null, err);
                }
                else {
                    decode = decoded;
                    cb(decoded);
                }
                    
                return;
            }
        });
       
        return decode;
    },
    
    signInUser : async function ({email, password}) {
        try{
            var result = {};
        const user = await User.findOne({email}); // email로 데이터조회
        if(!user) result.error = new Error('user not found'); //유저없을 시 에러발생

        const passwordCheck = await this.pwCheck(password, user.password); //password check
        if(!passwordCheck) result.error = new Error("wrong password"); // password 다를 시 에러 발생.

        result.token = await this.createToken(user._id); // user의 고유id로 토큰을 생성.
  
        }catch(err){
            result.error = err
        }finally{
            return result;
        }
        
    },

    signUpUser: async function({email}){
        try{
            const result = {};
            const user = await User.findOne({email});
        if(user){
            result.error = new Error('duplicated email');
            error.statusCode = 404;
            return result;
        }
        await this.createUser(req.body)
            .then(user => result._id = user._id)
            .catch(err => result.error = err); //유저 생성.
        }catch(err){
            result.error = err;
        }finally{
            return result;
        }
    }

}


