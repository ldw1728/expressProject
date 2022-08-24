// 각 라우터들을 이 index.js에서 app에 등록시킴.

const authRouter = require('./AuthRouter');
const baseRouter = require('./BaseRouter');
const error = require('../controller/ErrorController'); 

//express app에 라우터들을 등록.
const router = (app) => {
    
    app.use('/*',baseRouter);
    app.use('/auth',authRouter);

    //error 항상 마지막.
    error(app);
    
}

module.exports = router;