var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hortaSchema = new Schema({
	id: String,
	date: Date,
	turbidez: Number,
	vazao: Schema.Types.Decimal128,
	umidadeRelAr: Schema.Types.Decimal128,
	temperatura: Schema.Types.Decimal128,
	ph: Schema.Types.Decimal128

});

const Horta = mongoose.model('horta', hortaSchema);

module.exports = Horta;