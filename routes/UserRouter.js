const router = require('express').Router();
const userController = require('../controller/UserController');

router.post('/user/signup', userController.createUser);

module.exports = router;