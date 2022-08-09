//const logger = require('../config/winston');

const router = require('express').Router();

router.get('/home', function(req, res){
   // console.log('homepage');
    res.send('homepage');
})

module.exports = router; 