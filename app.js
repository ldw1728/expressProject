//global val
global.prop = require('./common/properties');

const express = require('express');
const morgan = require('./config/logger');      // logger
const router = require('./routes/indexRouter'); //routes
const bodyparser = require('body-parser');


const app = express();          // - def express app

////  **  app middleware    **
app.use(morgan);
//-- body-parser
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
router(app);//set routes


module.exports = app;