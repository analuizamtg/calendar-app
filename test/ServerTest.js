var expect    = require("chai").expect;
var request = require("request");
var superagent = require('superagent');

const BASE_URL = "http://localhost:5000/appointments";

const validAppointment = {
	title: "Meeting",
	dateAndTime: "Tue Jul 30 2048 17:21:31 GMT-0300",
	endDateAndTime: "Tue Jul 30 2048 19:21:31 GMT-0300"
};

describe("GET Request Test", function() {
	it("Should return status 200", function(done) {
		request(BASE_URL, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
        done();
      });
	});	
});

describe("POST Request Test", function() {
	it("Should return status 200 if appoinment is valid", function(done) {
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(validAppointment)
        .end(function(err,response){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

	it("Should return status 422 if appoinment overlaps with other appointments", function(done) {
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(validAppointment)
        .end(function(err,response){
        	expect(response.body.errors.dateAndTime.message).to.equal("The appointment overlaps with other appointments");
            expect(response.statusCode).to.equal(422);
            done();
        });
    });

	it("Should return status 422 if appoinment doesn't have a title", function(done) {
		var invalidAppointment = {
			title: "",
			dateAndTime: "Tue Jul 20 2018 17:21:31 GMT-0300",
			endDateAndTime: "Tue Jul 20 2018 18:21:31 GMT-0300"
		}
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(invalidAppointment)
        .end(function(err,response){
        	expect(response.statusCode).to.equal(422);
        	expect(response.body.errors.title.message).to.equal("Appointment title is required");
            done();
        });
    });

	it("Should return status 422 if appoinment's date is in the past", function(done) {
		var invalidAppointment = {
			title: "Meeting",
			dateAndTime: new Date("Tue Jul 30 2016 17:21:31 GMT-0300"),
			endDateAndTime: new Date("Tue Jul 30 2016 18:21:31 GMT-0300")
		}
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(invalidAppointment)
        .end(function(err,response){
            expect(response.statusCode).to.equal(422);
            expect(response.body.errors.dateAndTime.message).to.equal("The appointment cannot be scheduled in the past");
            done();
        });
    });

	it("Should return status 422 if appoinment has end date before start date", function(done) {
		var invalidAppointment = {
			title: "Meeting",
			dateAndTime: "Tue Jul 30 2016 17:21:31 GMT-0300",
			endDateAndTime: "Tue Jul 30 2016 13:21:31 GMT-0300"
		}
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(invalidAppointment)
        .end(function(err,response){
            expect(response.statusCode).to.equal(422);
            expect(response.body.errors.endDateAndTime.message).to.equal("End date must be greater than start date");
            done();
        });
    });
});		

describe("DELETE Request Test", function() {
	it("Should delete the last inserted appointment", function(done) {
		//Fetch appointments first and then deletes the last inserted.
		request(BASE_URL, function(error, response, body) {
			var appointments = JSON.parse(response.body);
			var lastInsertedAppointmentId = appointments[appointments.length - 1]._id;
					superagent.del(BASE_URL + "/" + lastInsertedAppointmentId)
			        .end(function(err,res){
			        	expect(res.statusCode).to.equal(200);
			            expect(JSON.parse(res.text).message).to.equal("Appointment was sucessfully deleted!");
			            done();
			        });
      });	
    });
});
