const router = require('express').Router();

router.all('/*',(req, res, next) => {
    console.log('base');
    next();
});

router.all('/',(req, res, next) => {
    res.send('index');
});


module.exports = router;