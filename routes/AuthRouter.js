const router = require('express').Router();
const authController = require('../controller/AuthController');

router.post('/signup', authController.signUpUser);
router.post('/signin', authController.signInUser);
router.get('/logout', authController.logout);

module.exports = router;