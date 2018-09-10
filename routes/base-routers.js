const router = require('express').Router();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
var mongoose = require('mongoose');

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

router.get('/formHorta', function(req, res){
    res.render('formHorta');
});

//POST REQUESTS
router.post('/register', urlencodedParser, function(req, res){
    Usuario.find({email: req.body["email"]}).then(function(result){
        if (result.length == 0){
            var newUser = new Usuario({
                nome: req.body["nome"],
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
            res.redirect('home');
        }
        else{
            errorMsg.msg = "Esse e-mail já foi cadastrado!";
            res.render('register', {error: errorMsg});
        }
    });
});

router.post('/formHorta', urlencodedParser, function(req, res) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mmm = today.getMinutes();
    today = mm + '/' + dd + '/' + yyyy + "-" + hh + ":" + mmm;

    Usuario.findOne({nome: req.user.nome}).then(function(result){
        result.hortas.push({
            data: today
        });

        hortaId = result.hortas[result.hortas.length-1]["id"];
        console.log("Esse eh o numero da sua horta! " + hortaId);

        result.save();
    });

     //generate a random number of garden
     //console.log(randomNumber);
     //search on database if there is such a number 
    // Usuario.find({}).then(function(Cliente){
     //   console.log(Cliente);
     //});
     //if there isnt, create
    
     //else generate new number
});

module.exports = router;