var Appointment = require('../models/appointment');

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
      res.status(200).send(savedAppointment);
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
      res.status(200).send(appointments);
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