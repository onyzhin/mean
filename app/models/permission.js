var mongoose = require('mongoose');

var PermissionSchema = new mongoose.Schema({
	title           : String,
	administration : Boolean
});

module.exports = PermissionSchema;