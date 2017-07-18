var Appointment = require('../models/appointment');

function mapAppointmentToHal(dbAppointment) {
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
      res.status(200).send(mapAppointmentToHal(savedAppointment));
    });
  };

  exports.get = function(req, res){
  	Appointment.find(function (err, appointments) {
  		if (err){
  			throw err;
  		}
  		if (appointments === null) {
        		res.status(404).send({ message: "Appointments' list was not found" });
      	}
      var result = {
        _links: {
        self: { href: '/appointments/'}
        },
        appointments : []
      }
      appointments.forEach(function(appointment){
        result.appointments.push(mapAppointmentToHal(appointment));
      })
      res.status(200).send(result);
  	});
  };
    
  exports.delete = function(req,res){
    var id = req.params.id;
    Appointment.findById(id, function(err, appointment){
      if (err){
        throw err;
      }
      if (appointment == null){
        res.status(404).send({message: "Appointment wasn't found"});
      } else {
          appointment.remove(function(err){
            if (err){
            res.status(400).send(err);
            return;
          } 
            res.status(200).send({message: "Appointment was sucessfully deleted!"})
        });
      }
    });
  };