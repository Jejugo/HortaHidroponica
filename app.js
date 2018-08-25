const express = require('express');
const controller = require('./controller/controller');
const connection = require('./controller/connection');
const authRoutes = require('./routes/auth-routers');
const cookieSession = require("cookie-session");
const keys = require('./services/keys');
const passport = require('passport');

//chama o arquivo de configuracao do passport
const passportSetup = require('./services/passport-config');

connection();

var app = express();

//usando o template ejs para renderizar as views
app.set('view engine', 'ejs');

//create time for cookie and encryption string for serialized User
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth', authRoutes);

//da ao node o poder de ver os arquivos static dentro da pasta public
app.use('/', express.static('public'));

//fire controller
controller(app);

app.listen(3000, function(){
	console.log("app is running...");
});