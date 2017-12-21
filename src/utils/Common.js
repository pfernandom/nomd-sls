module.exports.getUserFromContext = (context) => {
	try{
		return context.apiGateway.event.requestContext.authorizer.user;
	}
	catch(err){
		console.log("No authorizer info");
		return "anonymous";
	}
}


const removeEmptyStringElements = (obj) => {
  for (var prop in obj) {
    if (typeof obj[prop] === 'object') {// dive deeper in
      removeEmptyStringElements(obj[prop]);
    } else if(obj[prop] === '') {// delete elements that are empty strings
      delete obj[prop];
    }
  }
  return obj;
}
module.exports.removeEmptyStringElements = removeEmptyStringElements;
