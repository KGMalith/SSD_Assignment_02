let passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let User = require('../app/schema/user');

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET_ID,
    callbackURL: process.env.CALL_BACK_URL
},
    async function (accessToken, refreshToken, profile, cb) {
        try{
            let full_name = profile.displayName;
            let email = profile.emails[0].value;
            let google_auth_id = profile.id;
            let image_url = profile.photos[0].value;

            const user = await User.findOne({ google_auth_id: google_auth_id});

            if (user){
                return cb(null, user);
            }else{
                const newuser = await User.create({ full_name: full_name, email: email, google_auth_id: google_auth_id, image_url: image_url });
                if (newuser){
                    return cb(null, newuser);
                }
            }
        }catch(err){
            cb(err,null)
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    if (user) { done(null, user); }
});