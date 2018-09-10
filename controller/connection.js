var mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

module.exports = function(){
	
	mongoose.connect("mongodb://10.0.0.12:27017/cliente", { useNewUrlParser: true });
	mongoose.connection.once('open', function(){
		console.log("Connection has beem made, now make fireworks!");
	}).on('error', function(error){
		console.log("Connection error: ", error);
	});
	
	/*mongoose.connect("mongodb://127.0.0.1:27017/cliente", { useNewUrlParser: true });
	mongoose.connection.once('open', function(){
		console.log("Connection has beem made, now make fireworks!");
	}).on('error', function(error){
		console.log("Connection error: ", error);
	});*/

}

