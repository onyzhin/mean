var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
  title: { type: String, default: ""},
  tasks   : [{ type: Schema.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Project', ProjectSchema);