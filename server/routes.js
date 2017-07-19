const express = require('express');
const app = express();
const router = app.Router();
const appointments = require('./routes/appointments');

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

router.route('/appointments').post(appointments.create);

router.route('/appointments').get(appointments.get);

router.route('/appointments/:id').delete(appointments.delete);

module.exports.router = router;
