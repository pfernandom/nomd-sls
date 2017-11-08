import lib from '../auth0/lib'

const isString = (obj => typeof obj === 'string' || obj instanceof String )


// Lambda function index.handler - thin wrapper around lib.authenticate
module.exports.auth = function( event, context ) {
	try{
		console.log("Authenticat!");
		lib.authenticate( event )
			.then( context.succeed )
			.catch( err => {
				if ( ! err ) context.fail( "Unhandled error case" );
//      if ( err.message ) context.fail( err.message );
				console.log(err);
				context.fail( err );
			});
	}
	catch(err){
		console.log(err);
		context.fail( err );
	}
};
