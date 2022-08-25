
const AuthService = require('../service/AuthService');

exports.signUpUser = async(req, res, next) => {
    try{console.log(req.body)
        const { email } = req.body; //분해할당하여 email변수지정
        const result = AuthService.signUpUser({email});
        if(result.error){
            throw result.error;
        }
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

        const result = await AuthService.signInUser({email, password});

        // 토큰 값이 없고 
        if(!result.token){
            if(result.error) throw result.error; //에러존재시 throw
            else new Error('token undefined error'); //에러가 없다면 발생.
        } 
        
        res.cookie('token', result.token, {httpOnly:true}); //token값 client cookie에 저장. httpOnly 옵션으로 보안강화

        res.status(201).json({result: 'login success', token:result.token}).end(()=>{logger.login(`login success | ${email}`)});
    }catch(err){
        next(err);
    }
    
}

