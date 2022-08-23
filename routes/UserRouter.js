const router = require('express').Router();
const userController = require('../controller/UserController');

router.post('/signup', userController.signUpUser);
router.post('/signin', userController.signInUser);

module.exports = router; 