const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/user');

router.route('/register')
    .post(user.registerUser)

router.get('/verify-email', user.verifyUser);

router.route('/login')
    .post(passport.authenticate('local'), user.loginUser)

router.get('/logout', user.logoutUser);

module.exports = router;