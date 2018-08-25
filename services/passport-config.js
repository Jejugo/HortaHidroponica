const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const Usuario = require('../models/usuario');

passport.serializeUser(function(user, done){
    done(null, user["id"]);
});

passport.deserializeUser(function(id, done){
   
   Usuario.findById(id).then(function(user){
        done(null, user);
   });
   
});

passport.use(new GoogleStrategy({
    //options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret
    }, function(acessToken, refreshToken, profile, done){
        Usuario.findOne({senha: profile["id"]}).then(function(result){
            if (!result){
                var newUser = new Usuario({
                    usuario: profile["displayName"],
                    senha: profile["id"],
                });
                newUser.save().then(function(newUser){
                    console.log("New User created -> " + newUser);
                });
                done(null, newUser);
            }
            else{
                console.log("User is already on the system!");
                done(null, result);
            }
        });
    })
) 