//lib
const express = require('express');
const prop = require('./common/properties');
const homerouter = require('./routes/home');
const logger = require('./config/winston');

//variables definition 
const port = prop.getPort();    // - port
const app = express();          // - def express app

//accept middleware
app.use(homerouter);

app.get('/error', function(req, res){
    res.sendStatus(500);
    logger.error('500 error');
})

//server start
app.listen(port, ()=>{
    logger.info(`Server listening on port ${port}`);
}) 