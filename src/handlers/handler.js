import Service from '../services/Service'
import PatientService from '../services/PatientService';
import PatientTestUtils from '../../test/PatientTestUtils'

const isString = (obj => typeof obj === 'string' || obj instanceof String )


module.exports.hello = (event, context, callback) => {
	var service = new Service();

  const response = {
    statusCode: 200,
	headers: {
	  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
	  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
	},
    body: JSON.stringify(service.hello(event)),
  };

  callback(null, response);
};


module.exports.init = (event, context, callback) => {
	var service = new PatientService();
	const patients = PatientTestUtils.getTestPatients();

	patients.forEach(p=>{
		service.save(p)
	})

  const response = {
    statusCode: 200,
	headers: {
	  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
	  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
	},
    body: JSON.stringify(patients),
  };

  callback(null, response);
};
