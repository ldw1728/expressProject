
//global val
global.prop = require('./common/properties');

//lib
const express = require('express');
const baseRouter = require('./routes/BaseRouter');
const homerouter = require('./routes/Home');

const morgan = require('./config/logger');

//variables definition 
const port = prop.getPort();    // - port
const app = express();          // - def express app

//accept middleware
app.use(morgan);
app.use(baseRouter);
app.use(homerouter); 

app.use('/error', function(req, res, next){
    res.sendStatus(500);
    
})

//404 error 
app.use(function(req, res, next){
    next(err);
})

//**** 에러처리 정의하세요 */
app.use(function(err, req, res, next){
   
        console.log(err.stack)
        logger.error(err.stack);
        res.redirect('/');

})


//server start
app.listen(port, ()=>{
    logger.info(`Server listening on port ${port}`);
}) 