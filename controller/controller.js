const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

	app.get('/home', function(req, res){
		res.render('home', {data: ''});
	});

};