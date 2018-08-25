const router = require('express').Router();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');

var errorMsg = [{msg: ''}];
var success = {msg: ''};

var urlencodedParser = bodyParser.urlencoded({extended: false});

//GET REQUESTS
router.get('/home', function(req, res){
    res.render('home', {data: ''});
});

router.get('/register', function(req, res){
    res.render('register', {error: errorMsg, success: success});
});

//POST REQUESTS
router.post('/register', urlencodedParser, function(req, res){
    Usuario.find({email: req.body["email"]}).then(function(result){
        if (result.length == 0){
            var newUser = new Usuario({
                usuario: req.body["nome"],
                senha: req.body["senha"],
                email: req.body["email"],
                estado: req.body["estado"],
                hortas: []

            });

            Usuario.createUser(newUser, function(err, user){
                if (err) throw err;
                console.log(err);
            });

            success.msg = 'Successfully Registered!!';
            console.log(newUser);
            //res.render('login', {user: newUser, msg: ''});*/
        }
        else{
            errorMsg.msg = "Esse e-mail já foi cadastrado!";
            console.log(errorMsg);
            res.render('register', {error: errorMsg});
        }
    });
});

module.exports = router;