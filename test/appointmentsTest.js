var expect    = require("chai").expect;
var request = require("request");
var superagent = require('superagent');
var should = require('should');

const BASE_URL = "http://localhost:5000/appointments";

const validAppointment = {
	title: "Meeting",
	dateAndTime: "Tue Jul 30 2048 17:21:31 GMT-0300",
	endDateAndTime: "Tue Jul 30 2048 19:21:31 GMT-0300"
};

describe("GET /appointments test", function() {
	it("Should return status 200", function(done) {
		request(BASE_URL, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
        done();
      });
	});	
});

describe("POST /appointments test", function() {
	it("Should return status 200 if appoinment is valid", function(done) {
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(validAppointment)
        .end(function(err,response){
        	response.header.location.should.startWith("/appointments");
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

	it("Should return status 422 and error message if appoinment doesn't have a title", function(done) {
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

    it("Should return status 422 and error message if appoinment doesn't have a start date", function(done) {
		var invalidAppointment = {
			title: "Meeting",
			dateAndTime: "",
			endDateAndTime: "Tue Jul 20 2018 18:21:31 GMT-0300"
		}
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(invalidAppointment)
        .end(function(err,response){
        	expect(response.statusCode).to.equal(422);
        	expect(response.body.errors.dateAndTime.message).to.equal("Appointment start date is required");
            done();
        });
    });

    it("Should return status 422 and error message if appoinment doesn't have an end date", function(done) {
		var invalidAppointment = {
			title: "Meeting",
			dateAndTime: "Tue Jul 20 2018 18:21:31 GMT-0300",
			endDateAndTime: ""
		}
		superagent.post(BASE_URL)
		.set('Content-Type', 'application/json')
        .send(invalidAppointment)
        .end(function(err,response){
        	expect(response.statusCode).to.equal(422);
        	expect(response.body.errors.endDateAndTime.message).to.equal("Appointment end date is required");
            done();
        });
    });

	it("Should return status 422 and error message if appoinment's date is in the past", function(done) {
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

	it("Should return status 422 and error message if appoinment has end date before start date", function(done) {
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

describe("DELETE /appointments/:id test", function() {
	it("Should delete the last inserted appointment", function(done) {
		//Fetch appointments first and then deletes the last inserted.
		request(BASE_URL, function(error, response, body) {
			var appointments = JSON.parse(response.body);
			var lastInsertedAppointmentId = appointments[appointments.length - 1]._id;
					superagent.del(BASE_URL + "/" + lastInsertedAppointmentId)
			        .end(function(err,res){
			        	expect(res.statusCode).to.equal(200);
			        	expect(res.body._id).to.equal(lastInsertedAppointmentId);
			            done();
			        });
      });	
    });
});
