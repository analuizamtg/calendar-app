var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
const path = require('path');

var app = express();
app.use(cors());
app.use(bodyParser());
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
const PORT = process.env.PORT || 5000;

var routes = require('./routes');
app.use('/', routes.router);

mongoose.connect("mongodb://admin:admin@ds157342.mlab.com:57342/calendar");

function start () {
 	app.listen(PORT);
 	console.log('Server started on port ${PORT}');
}

exports.app = app;
exports.start = start;
