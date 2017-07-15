var Appointment = require('../models/appointment');

function mapAppointment(dbAppointment) {
  var halAppointment = {
    _links: {
      self: { href: '/appointments/' + dbAppointment.id },
    },
    id: dbAppointment.id,
    title: dbAppointment.title,
    dateAndTime: dbAppointment.dateAndTime,
    endDateAndTime: dbAppointment.endDateAndTime
  };
  return halAppointment;
}

exports.create = function (req, res) {
  var newAppointment = new Appointment(req.body);
  newAppointment.save(function (err, savedAppointment) {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(400).send(err);
      }
      return;
    }
    res.set('Location', '/appointments/' + savedAppointment.id);
    res.status(200).send(mapAppointment(savedAppointment));
  });
};

exports.get = function(req, res){
	Appointment.find(function (err, appointments) {
		if (err){
			throw err;
		}
		if (appointments === null) {
      		res.status(404).send({ message: 'Appointment can not be found' });
    	}
    	console.log(appointments);
      	res.status(200).send(appointments);
	});
}

