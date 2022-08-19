const router = require('express').Router();
const userController = require('../controller/UserController');

router.post('/signup', userController.createUser);

module.exports = router;