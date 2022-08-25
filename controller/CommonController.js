
const authService = require('../service/AuthService');

module.exports = (req, res, next) => {
    req.tokenVerify = authService.tokenVerify;
    try{
        //jwt 검증. (사용자 토큰이 유효한지.)
        authService.tokenVerify(req.cookies.token, (decode, err) => {
            if(decode){
                console.log('auth pass');
                req.user = decode;
                
            }
            else {
                if(err && err.name === 'TokenExpiredError'){
                    console.log('auth expire');
                    //res.send('login page');
                    if(isLoginReqPage(req.originalUrl)){
                        res.send('login page');
                        return;
                    }
                }         
            }
            next();
        });
        
    }catch(err){
        if(err.message == 'token is not defined'){ //토큰참조에러 시
            console.log(req.cookies.token)
            if(isLoginReqPage(req.originalUrl)){
                res.send('login page'); 
                return;              
            }
        }
        next(err); 
    }
    
}

// 로그인 요청 페이지 인지 확인.
const isLoginReqPage = (reqUrl) => {
    const loginReqArr = prop.getValue('url.loginReq').split(':');
    var isLoginUrl = false;
    loginReqArr.forEach(e => {
        if(e != '' && e != null && reqUrl.indexOf(e) > -1){
            isLoginUrl = true; 
            //return; 
        }
    });
    return isLoginUrl;
}