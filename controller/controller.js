const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
const Horta = require('../models/horta');
var express = require('express');
const bcrypt = require('bcryptjs');

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

	app.post('/register', urlencodedParser, function(req, res){
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
}