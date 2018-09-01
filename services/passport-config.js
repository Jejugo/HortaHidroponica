const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys')
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

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
        Usuario.findOne({googleId: profile["id"]}).then(function(result){
            if (!result){
                var newUser = new Usuario({
                    nome: profile["displayName"],
                    googleId: profile["id"],
                });
                newUser.save().then(function(newUser){
                    console.log("New User created -> " + newUser);
                    console.log(profile);
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


passport.use(new LocalStrategy({
        usernameField: "email", //name fields in HTML
        passwordField: "senha" //name field in HTML
    },
	function (username, password, done) {
        console.log(username, password);
		Usuario.find({email: username}).then(function(result){
            bcrypt.compare(password, result[0]["senha"], function(err, result2) {
                if (result2 === true){
                    return done(null, result[0]);
                }
                else{
                    return done(null, false, { message: 'Dados Incorretos' });
                }
            });
        });
	}));