var express = require('express');
var app = express(); 						
var mongoose = require('mongoose'); 				
var port = process.env.PORT || 8080; 				
var database = require('./config/database'); 			
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.localUrl, function function_name(err, success) {
	console.log(err);
	if (err) throw err;	
})	

app.use(express.static(__dirname + '/public')); 		
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended': 'true'})); /
app.use(bodyParser.json()); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 
app.use(methodOverride('X-HTTP-Method-Override')); 

require('./app/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);
