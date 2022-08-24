const User = require('../models/User.js');
const authService = require('../service/AuthService')(User);

exports.signUpUser = async(req, res, next) => {
    try{console.log(req.body)
        const { email } = req.body; //분해할당하여 email변수지정
        const user = await User.findOne({email});
        if(user){
            let error = new Error('email 중복');
            error.statusCode = 404;
            throw error; //에러 던짐.
        }
        await authService.createUser(req.body); //유저 생성.
        res.status(201).json({message : 'user created.'}); 
    }catch(err){
        next(err);    
    }
}

exports.signInUser = async (req, res, next) => {
    try{
        const {email = null, password = null} = req.body; //request의 body 데이터를 가져옴.
        
        if(!email || !password)
            throw new Error("invaild input");
        
        const user = await User.findOne({email}); // email로 데이터조회
        if(!user) throw new Error('user not found'); //유저없을 시 에러발생

        const passwordCheck = await authService.pwCheck(password, user.password); //password check
        if(!passwordCheck) throw new Error("wrong password"); // password 다를 시 에러 발생.

        const token = authService.createToken(user._id); // user의 고유id로 토큰을 생성.

        res.cookie('token', token, {httpOnly:true}); //token값 client cookie에 저장. httpOnly 옵션으로 보안강화

        res.status(201).json({result: 'login success', token}).end(()=>{logger.login(`login success | ${user.email}`)});
    }catch(err){
        next(err);
    }
    
}



// exports.signInUser = async (req, res, next) => {
//     try{
//         const {email = null, password = null} = req.body; //request의 body 데이터를 가져옴.
        
//         if(!email || !password)
//             throw new Error("invaild input");
        
//         passport.authenticate('local',(err, user, info)=>{
//             if(!user) throw new Error('user not found'); //유저없을 시 에러발생

//             const token = authService.createToken(user._id); // user의 고유id로 토큰을 생성.
//             res.cookie('token', token, {httpOnly:true}); //token값 client cookie에 저장. httpOnly 옵션으로 보안강화
//             res.status(201).json({result: 'login success', token}).end(()=>{logger.login(`login success | ${user.email}`)});
//         });     
//     }catch(err){
//         next(err);
//     }
    
// }