//const logger = require('../config/winston');

const router = require('express').Router();

router.get('/', function(req, res){
    console.log('homepage');
    res.send('homepage');
    logger.debug('home')
})

module.exports = router;