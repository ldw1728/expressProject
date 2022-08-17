const router = require('express').Router();

router.all('/*',(req, res, next) => {
    console.log('base');
    next();
});


module.exports = router;