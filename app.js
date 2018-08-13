const express = require('express');
const controller = require('./controller/controller');
const connection = require('./controller/connection');
const expressValidator = require('express-validator');

connection();

var app = express();

//usando o template ejs para renderizar as views
app.set('view engine', 'ejs');

//da ao node o poder de ver os arquivos static dentro da pasta public
app.use('/', express.static('public'));

//fire controller
controller(app);

app.listen(3000, function(){
	console.log("app is running...");
});