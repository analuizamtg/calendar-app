var express = require('express');
var app = express();
var router = express.Router();
var appointments = require('./routes/appointments');

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

router.route('/appointments').post(appointments.create);

router.route('/appointments').get(appointments.get);

router.route('/appointments/:id').delete(appointments.delete);

module.exports.router = router;
