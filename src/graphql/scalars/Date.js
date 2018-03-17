

const GraphQL = require('graphql');
const {
	GraphQLScalarType,
} = GraphQL;

const DateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'A date scalar',
	parseValue(value) {
		return new Date(value); // value from the client
	},
	serialize(value) {
		return value instanceof Date ? value.getTime() : value; // value sent to the client
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return parseInt(ast.value, 10); // ast value is always in string format
		}
		return null;
	},
});

module.exports = DateScalar;
