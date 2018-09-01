const router = require('express').Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');


var urlencodedParser = bodyParser.urlencoded({extended: false});
var errorMsg = [{msg: ''}];
var success = {msg: ''};

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/home');
});

router.get('/google', passport.authenticate('google', {
    scope:['profile'] 
}));

router.get('/google/redirect', passport.authenticate('google'), function(req, res){
    res.redirect('/profile/');
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/profile/');
});



module.exports = router;
