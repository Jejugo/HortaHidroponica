const express = require('express');
const baseRoutes = require('./routes/base-routers');
const profileRoutes = require('./routes/profile-routers');
const connection = require('./controller/connection');
const authRoutes = require('./routes/auth-routers');
const cookieSession = require("cookie-session");
const keys = require('./services/keys');
const passport = require('passport');
const bodyParser = require('body-parser');

//chama o arquivo de configuracao do passport
const passportSetup = require('./services/passport-config');

connection();

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

//set up base routes
app.use(baseRoutes);

//set up routes for authorization
app.use('/auth', authRoutes);

//set up profile routes
app.use('/profile', profileRoutes);

//da ao node o poder de ver os arquivos static dentro da pasta public
app.use('/', express.static('public'));

app.listen(3000, function(){
	console.log("Application is running...");
});
