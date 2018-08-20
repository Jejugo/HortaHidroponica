const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var errorMsg = [{msg: ''}];
var success = {msg: ''};

module.exports = function(app){

	//GET REQUESTS
	app.get('/home', function(req, res){
		res.render('home', {data: ''});
	});

	//POST REQUESTS
	app.post('/login', urlencodedParser, function(req, res){
		Usuario.find({email: req.body["email"]}).then(function(result){
			bcrypt.compare(req.body["senha"], result[0]["senha"], function(err, result2) {
				if (result2 === true){
					res.render('login', {user: result[0], msg: ''});
				}
				else{
					res.render('home', {data: 'Dados Incorretos.'});
				}
			});
		});
	});
}