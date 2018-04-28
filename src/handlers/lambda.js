const GraphQLSchema = require('../graphql/schemaDef').default;
const server = require('apollo-server-lambda');

console.log('GraphQLSchema', GraphQLSchema);

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
	const callbackFilter = function callbackFilter(error, output) {
		output.headers['Access-Control-Allow-Origin'] = '*';
		output.headers['Access-Control-Allow-Credentials'] = true;
		callback(error, output);
	};
	const handler = server.graphqlLambda({
		schema: GraphQLSchema,
		tracing: true,
		cacheControl: true,
	});

	return handler(event, context, callbackFilter);
};


exports.graphiqlHandler = server.graphiqlLambda({ endpointURL: '/graphql' });
