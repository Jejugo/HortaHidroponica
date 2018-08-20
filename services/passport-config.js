const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const Usuario = require('../models/usuario');


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
            }
            else{
                console.log("User is already on the system!");
            }
        });
    })
) 