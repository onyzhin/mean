var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	description : String,
	details     : { type: String, default: ""},
	priority    : { type: Number, min: 0, max: 100 },
	timePlaning : Number,
	starting    : { type: Date, default: Date.now },
	finish      : { type: Date, default: Date.now },
	completion  : { type: Number, min: 0, max: 100 },
	complete    : { type: Boolean, default: false},
	author      : { type: Schema.ObjectId, ref: 'Person' },
	developer   : { type: Schema.ObjectId, ref: 'Person' },
	project 	: { type: Schema.ObjectId, ref: 'Project'}
});

module.exports = mongoose.model('Task', TaskSchema);