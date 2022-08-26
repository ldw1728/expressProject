
const AuthService = require('../service/AuthService');

exports.signUpUser = async(req, res, next) => {
    try{
        const reqUser = req.body; 

        const result = await AuthService.signUpUser(reqUser);

        if(result.error){
            throw result.error;
        }

        res.status(201).json({result}); 
    }catch(err){
        next(err);    
    }
} 

exports.signInUser = async (req, res, next) => {
    try{
        const {email = null, password = null} = req.body; //request의 body 데이터를 가져옴.        

        const result = await AuthService.signInUser({email, password});

        // 토큰 값이 없고 
        if(!result.token){
            if(result.error) throw result.error; //에러존재시 throw
            else new Error('token undefined error'); //에러가 없다면 발생.
        } 
        else
            res.cookie('token', result.token, {httpOnly:true}); //token값 client cookie에 저장. httpOnly 옵션으로 보안강화

        await AuthService.setSignInHst(result.user);   

        res.status(201).json({result});
    }catch(err){
        next(err);
    }
    
}

//logout
exports.logout = (req, res, next) => {
    try{
        res.cookie('token', null, {maxAge:0});
        res.send('succ logout');
    }catch(err){
        next(err);
    }
}

