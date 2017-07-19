var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

var app = express();
app.use(cors());
app.use(bodyParser());

var routes = require('./routes');
app.use('/', routes.router);

mongoose.connect("mongodb://admin:admin@ds157342.mlab.com:57342/calendar");

function start () {
 	var port = 5000;;
 	app.listen(port);
 	console.log('Server started on port ' + port);
}

exports.app = app;
exports.start = start;
