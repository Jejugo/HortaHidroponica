const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth-20');

passport.use(new GoogleStrategy({
    //options for strategy
    }), function(){
    //passport callback function
    }
)