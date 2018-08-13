var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hortaSchema = new Schema({
	id: Number,
	ph: {type: Number, min: 0, max: 14},
	turbidez: Number,
	vazao: Schema.Types.Decimal128,
	humidadeRelativa: Schema.Types.Decimal128,
	temperatura: Schema.Types.Decimal128

});

const usuarioSchema = new Schema({
	usuario: String,
	senha: String,
	email: {type: String, lowercase: true},
	estado: String,
	hortas: [hortaSchema]
});

const Usuario = mongoose.model('cliente', usuarioSchema);

module.exports = Usuario;

module.exports.createUser = function(newUser, callback){
	var bcrypt = require('bcryptjs');
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.senha, salt, function(err, hash) {
	        newUser.senha = hash;
	        newUser.save(callback);
	    });
	});
}