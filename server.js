
const app = require('./app');

const mongoose = require('mongoose');

//variables definition 
const port = prop.getPort();    // - port

// -- configure mongo
var db = mongoose.connection;
db.on('error', function(err){logger.error(err)});
db.once('open', function(){
    logger.info('connected to mongodb server...');
});

mongoose.connect('mongodb://localhost/mongo_tuto');

//server start
app.listen(port, ()=>{
    logger.info(`Server listening on port ${port}`);
}) 
