const express = require('express');
const appointments = require('./requesthandlers/appointments');

const app = express();
const router = express.Router();

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

router.route('/appointments').post(appointments.create);

router.route('/appointments').get(appointments.get);

router.route('/appointments/:id').delete(appointments.delete);

module.exports.router = router;
