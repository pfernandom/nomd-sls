const express = require('express');
const body_parser = require('body-parser');
const expressGraphQL = require('express-graphql');
const GraphQLSchema = require('./graphql/schemaDef');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(body_parser.json({ limit: '50mb' }));

app.use(function logErrors(err, req, res, next) {
	console.error('Errors:', err.stack);
	next(err);
});

app.use('/', expressGraphQL(() => {
	return {
		graphiql: true,
		schema: GraphQLSchema.default,
	};
})
);

module.exports = app;
