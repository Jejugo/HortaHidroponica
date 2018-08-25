const router = require('express').Router();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var errorMsg = [{msg: ''}];
var success = {msg: ''};

const authCheck = (req, res, next) => {
    if(req.user != null){
        next();
    }
    else{
        res.redirect('/home');
    }
};

router.get("/", authCheck, function(req, res){
    res.render('profile', {user: req.user, msg: ''});
});
 

module.exports = router;