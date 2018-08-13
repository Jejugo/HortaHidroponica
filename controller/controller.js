const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
const Horta = require('../models/horta');
var express = require('express');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var errorMsg = [{msg: ''}];
var success = {msg: ''};

module.exports = function(app){


	//GET REQUESTS
	app.get('/home', function(req, res){
		res.render('home', {data: ''});
	});

	app.get('/register', function(req, res){
		res.render('register', {error: errorMsg, success: success});
	});

	app.get('/login', function(req, res){
		res.render('login', {data: ''});
	});

	//POST REQUESTS

	app.post('/login', function(req, res){
		console.log(req.body["email"]);
	});

	app.post('/register', urlencodedParser, function(req, res){
		Usuario.find({email: req.body["email"]}).then(function(result){
			if (result.length == 0){
				console.log(result)
				var newUser = new Usuario({
					usuario: req.body["nome"],
					password: req.body["senha"],
					email: req.body["email"],
					estado: req.body["estado"]
				});

				Usuario.createUser(newUser, function(err, user){
					if (err) throw err;
					console.log(err);
				});

				success.msg = 'Successfully Registered!!';
				console.log(newUser);
				res.render('login', {user: newUser, msg: ''});
			}
			else{
				errorMsg.msg = "Esse e-mail já foi cadastrado!";
				console.log(errorMsg);
				res.render('register', {error: errorMsg});
			}
		});
	});


};