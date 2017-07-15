var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser());

var routes = require('./routes');
app.use('/', routes.router);

mongoose.connect("mongodb://admin:admin@ds157342.mlab.com:57342/calendar");

function start () {
 	var port = 5000;;
 	app.listen(port);
 	console.log('Appoints service started on port ' + port);
}

exports.app = app;
exports.start = start;
