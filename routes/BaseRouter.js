const router = require('express').Router();

router.all('/',(req, res, next) => {
    console.log('index page');
    res.redirect('/main');
});


router.get('/main', (req, res, next)=>{
    // console.log('homepage');
    //console.log(JSON.stringify(req.user))
     res.send('main page');
     
 })


module.exports = router;