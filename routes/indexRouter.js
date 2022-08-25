// 각 라우터들을 이 index.js에서 app에 등록시킴.

const authRouter = require('./AuthRouter');
const baseRouter = require('./BaseRouter');
const userRouter = require('./UserRouter');
const common = require('../controller/CommonController');
const error = require('../controller/ErrorController'); 

//express app에 라우터들을 등록.
const router = (app) => {
    
    app.use(common, baseRouter);
    app.use('/auth',authRouter);
    app.use('/user',  userRouter);

    //error 항상 마지막.
    error(app);
    
}

module.exports = router;