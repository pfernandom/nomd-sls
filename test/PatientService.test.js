require('dotenv').config();
var TestUtils = require('./TestUtils.util');
var PatientService = require("../src/services/PatientService");
const PatientTestUtils = require("./PatientTestUtils")


var assert = require('chai').assert;
var should = require('chai').should();
var service = new PatientService();


const patients = PatientTestUtils.getTestPatients();

describe("Patient tests", function () {

	before(function(done){
		this.timeout(50000);
		TestUtils.mockDB().then(function(data){
			console.log("The DB started correctly");

			patients.forEach(p => {
				service.save(p);
			})

			done();
		})
		.catch(function(err){
			assert(false,"Could not create the mock DB");
			done();
		});
	});

	it('should save a patient', function(done){
	 var patient = {name:"Pedro Marquez"};

	 service.save(patient).then(data => {
		 console.log(data);
		 assert(true);
		 done();
	 })
	 .catch(e => {
		 console.error(e);
		 assert(false);
		 done(e);
	 })
 })

	it('should retrieve all patients', function(){
		this.timeout(50000);
		console.log("Retrieve all patients")
	 return service.findAll().then(data => {
		 console.log(data);
		 assert(data.Items.length > 0, "No records were found in the db");
	 })
	 .catch(e => {
		 console.error("Could not retrieve the patients",e);
		 assert(false,"Could not retrieve the patients");
	 })
	})
});
