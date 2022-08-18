const User = require('../models/User.js');
const userService = require('../service/AuthService')(User);

exports.createUser = async(req, res, next) => {
    try{
        const { email } = req.body; //분해할당하여 email변수지정
        const user = User.findOne(email);
        if(user){
            let error = new Error('email 중복');
            error.statusCode = 404;
            throw error; //에러 던짐.
        }
        await userService.createUser(req.body); //유저 생성.
        res.status(201).json({message : 'user created.'}); 
    }catch(err){
        next(err);
    }
}