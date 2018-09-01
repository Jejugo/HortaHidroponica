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

router.get('/formHorta', function(req, res){
    res.render('formHorta');
});

router.get('/arduinoapi', function(req, res){
    res.json({
        hortas: [{
            "id": "313123123",
            "email": "jeffgoes22@gmail.com",
            "ph": "3",
            "data": "03-02-14",
            "turbidez": 123.3,
            "vazao": 12.4,
            "umidadeRelAr": 20,
            "temperatura": 33,
        }, 
        {
            "id": "456664564564",
            "email": "mari@gmail.com",
            "ph": "3",
            "data": "03-02-14",
            "turbidez": 123.3,
            "vazao": 12.4,
            "umidadeRelAr": 20,
            "temperatura": 33,
        },
        {
            "id": "678768768768",
            "email": "lucas@gmail.com",
            "ph": "3",
            "data": "03-02-14",
            "turbidez": 123.3,
            "vazao": 12.4,
            "umidadeRelAr": 20,
            "temperatura": 33,
        },
        {
            "id": "0022453211434",
            "email": "camila@gmail.com",
            "ph": "3",
            "data": "03-02-14",
            "turbidez": 123.3,
            "vazao": 12.4,
            "umidadeRelAr": 20,
            "temperatura": 33,
        }]
    });
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

router.post('/formHorta', urlencodedParser, function(req, res){
    resAPI = req.body;
    user = req.user;
    console.log(resAPI);
    console.log(user);
    /*if(resAPI["UserId"] == user["id"]){
        Usuario.find({CPF: user["CPF"]}).then(function(result){

        });
    }*/

});


module.exports = router;