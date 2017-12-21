import lib from '../auth0/lib';

// Lambda function index.handler - thin wrapper around lib.authenticate
module.exports.auth = function( event, context, callback ) {
	try{
		lib.authenticate(event, function (err, data) {
	    	if (err) {
		      context.fail("Unauthorized");
		    }
		    else {
					callback(null, data);
				}
	  });
	}
	catch(err){
		console.error("There was an error while running the authorizer",err);
		callback(err);
	}
};
