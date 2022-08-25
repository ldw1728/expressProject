const router = require('express').Router();
const userCtrlr = require('../controller/UserController');

router.get('/info', userCtrlr.getUser);

module.exports = router;