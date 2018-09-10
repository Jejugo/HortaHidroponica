const mongoose = require('mongoose');
//const AutomIncrement = require('mongoose-sequence').mongo
const Schema = mongoose.Schema;

const Historico = new Schema({
	ph: {type: Number, min: 0, max: 14},
	data: Date,
	turbidez: Number,
	vazao: String,
	umidadeRelAr: String,
	temperatura: String
});

const PedidoSchema = new Schema({
	quantidade: Number,
	Preco: Number
});

const HortaSchema = new Schema({
	ph: {type: Number, min: 0, max: 14},
	data: Date,
	turbidez: Number,
	vazao: String,
	umidadeRelAr: String,
	temperatura: String,
	historico: [Historico]

});

const UsuarioSchema = new Schema({
	nome: String,
	senha: String,
	email: {type: String, lowercase: true},
	estado: String,
	hortas: [HortaSchema],
	pedidos: [PedidoSchema],
	googleId: String,
	facebookId: String
});

const Usuario = mongoose.model('cliente', UsuarioSchema);
//UsuarioSchema.plugin(AutomIncrement, {hortas: {id}});

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