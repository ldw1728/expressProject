
const authService = require('../service/AuthService');

module.exports = (req, res, next) => {
    //req.tokenVerify = authService.tokenVerify;
    try{    
        const userToken = req.cookies.token;
        
        let result = {};

        //jwt 검증. (사용자 토큰이 유효한지.)
        result = authService.tokenVerify(userToken);

        if(!result.obj){
            //로그인 요구 페이지 확인.
            if(isLoginReqPage(req.originalUrl)){
                res.send('login page');
                return;
            }

            if(result.err !== 'TokenExpiredError')
            throw result.err;
        }
        next();
    }catch(err){
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