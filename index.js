//lib
const express = require('express');
const prop = require('./common/properties');
const homerouter = require('./routes/home');

//variables definition 
const port = prop.getPort();    // - port
const app = express();          // - def express app

//accept middleware
app.use(homerouter);

//server start
app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
}) 