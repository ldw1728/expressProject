
//global val
global.prop = require('./common/properties');

//load pakage
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const baseRouter = require('./routes/BaseRouter');
const homerouter = require('./routes/Home');


const morgan = require('./config/logger');

//variables definition 
const port = prop.getPort();    // - port
const app = express();          // - def express app

//// -- accept middleware
// -- logger
app.use(morgan);
//-- body-parser
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

// -- configure mongo
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    logger.info('connected to mongodb server...');
});

mongoose.connect('mongodb://localhost/mongo_tuto');

var Data = require('./models/data');

// -- router
app.use(baseRouter);
app.use(homerouter); 

const apirouter = require('./routes/Api.js')(app, Data);

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