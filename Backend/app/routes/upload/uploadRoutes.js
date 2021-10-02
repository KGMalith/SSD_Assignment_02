const router = require('express').Router();
let passport = require('passport');
let uploadController = require('../../controllers/upload/uploadController')

router.get(
    '/auth/google',
    passport.authenticate('jwt', { session: false }),
    uploadController.getGoogleAccountConnection
);

router.post(
    '/auth/connect-account',
    passport.authenticate('jwt', { session: false }),
    uploadController.connectGoogleAccount
);

router.get(
    '/auth/disconnect-account',
    passport.authenticate('jwt', { session: false }),
    uploadController.disconnectGoogleAccount
);

router.post(
    '/image',
    passport.authenticate('jwt', { session: false }),
    uploadController.uploadImage
);


module.exports = router;