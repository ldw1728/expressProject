var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    email : {
        type : 'String',
        required : true
    },
    password : {
        type : 'String',
        required : true,
    },
    name : {
        type : 'String',
        required : true
    },
    birth : {
        type : 'String',
        default : '0'
    },
    phon : {
        type : 'String',
        default : '0'
    },
    reg_dt : {
        type : 'Date',
        default : Date.now
    }

});

module.exports = mongoose.model('user', User);