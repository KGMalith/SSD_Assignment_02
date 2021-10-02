const router = require('express').Router();
let passport = require('passport');
let authController = require('../../controllers/auth/authController')

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google',{session:false}),
    authController.googleAuth
);

router.get(
    '/get-user-details',
    passport.authenticate('jwt', { session: false }),
    authController.getUserDetails
);

module.exports = router;