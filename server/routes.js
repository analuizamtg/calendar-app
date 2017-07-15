var express = require('express');

var router = express.Router();
var appointments = require('./routes/appointments');

router.route('/appointments').post(appointments.create);

router.route('/appointments').get(appointments.get);

module.exports.router = router;
