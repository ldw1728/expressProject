//global val
global.prop = require('./common/properties');

//onst {passport} = require('./config/passport');

const express = require('express');
const {morgan} = require('./config/logger');
const router = require('./routes/indexRouter'); //routes
const bodyparser = require('body-parser');
const cookie = require('cookie-parser');


const app = express();          // - def express app

////  **  app middleware    **
app.use(morgan);
//-- body-parser
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(cookie());
router(app);//set routes


module.exports = app;