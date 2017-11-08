import Service from '../services/Service'

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
