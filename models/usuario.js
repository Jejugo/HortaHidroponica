var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const usuarioSchema = new Schema({
	usuario: String,
	pass: String,
	email: String,
	estado: String
});

const Usuario = mongoose.model('cliente', usuarioSchema);

module.exports = Usuario;

module.exports.createUser = function(newUser, callback){
	var bcrypt = require('bcryptjs');
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.pass, salt, function(err, hash) {
	        newUser.pass= hash;
	        newUser.save(callback);
	    });
	});
}