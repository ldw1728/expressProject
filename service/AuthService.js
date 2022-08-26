
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
    
    createUser: async function(userInput) {
        const user = await this.userWithEncodePassword(userInput);
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

    //jwt 검증
    tokenVerify : async function(token, cb = null) {
        let result = {};
        let resultFunc = cb !== null ? cb : (obj = null, err = null) =>{ result.obj = obj; result.err=err }; 
        try{
            await jwt.verify(token, prop.getValue('auth.jwt.key'), (err, decoded)=>{         
                if(decoded){
                    resultFunc(decoded, null);
                }
                else {
                    resultFunc(null, err);
                }                  
                return;         
            });
        }catch(err){
            if(err.name === 'TokenExpiredError')
            resultFunc(null, err);
        }
        return result;
    },

    // 로그인 이력
    setSignInHst : async function(user){
        user.last_dt = Date.now();
        await user.save();
        logger.login(`login success | ${user.email}`);
    },
    
    //로그인
    signInUser : async function ({email, password}) {
        try{
            var result = {
                msg     : '',
                code    : '',
                error   : null
            };
            if(email && password){
                const user = await User.findOne({email}); // email로 데이터조회
                if(!user){//유저없을 시 에러발생
                    result.msg      = 'user not found';
                    result.code     = 'NOTFOUND';
                }

                const passwordCheck = await this.pwCheck(password, user.password); //password check
                if(!passwordCheck){
                    result.msg      = 'wrong password';
                    result.code     = 'WRONGPW';
                } // password 다를 시 에러 발생.

                if(user && passwordCheck){
                    result.user      = user;
                    result.token    = await this.createToken(user._id); // user의 고유id로 토큰을 생성.
                    result.msg      = 'signIn User';
                    result.code     = 'SUCC';
                }
            }
            else{
                result.msg      = 'invaild input';
                result.code     = 'INV';
            }
        
            
        }catch(err){
            result.error    = err
        }finally{
            return result;
        }
        
    },
    // 회원가입
    signUpUser: async function(reqUser){
        let result = {
            _id : null,
            msg : '',
            code : '',
            error : null
        };
        try{     
            const user = await User.findOne({email : reqUser.email});
        if(user){            
            result.msg      = 'duplicated email';
            result.code     = 'DUP';
            return result;
        }
        await this.createUser(reqUser)
            .then(user => {
                result._id      = user._id;
                result.code     = 'SUCC';
                result.msg      = 'created User';
            })
            .catch(err => result.error = err); //유저 생성.
        }catch(err){
            result.error = err;
        }finally{
            return result;
        }
    }

}


