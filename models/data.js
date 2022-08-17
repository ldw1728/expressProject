var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tmpData = new Schema({
    id : {type:'Number', default: 0},
    name : 'String', 
    isdata : 'Boolean',
    reg_dt : {type:'Date', default: Date.now}
});

module.exports = mongoose.model('data', tmpData);