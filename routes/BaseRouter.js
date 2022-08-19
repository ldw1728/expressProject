const router = require('express').Router();

router.all((req, res, next) => {
    console.log('base');
    next();
});


router.get('/', function(req, res){
    // console.log('homepage');
     res.send('homepage');
 })


module.exports = router;