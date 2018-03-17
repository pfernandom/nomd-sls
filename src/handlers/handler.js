import Service from '../services/Service';
import ArticleService from '../services/ArticleService';
import uuid from 'uuid';


const testData = {
	articles: [
		{
			id: uuid.v4(),
			locale: 'en_US',
			categories: ['money'],
			title: 'How much will I make after taxes?',
			content: `Put something here
          Something good
        `,
		},
		{
			id: uuid.v4(),
			locale: 'en_US',
			categories: ['money'],
			title: 'Do I need to fill a tax return?',
			content: `Put something here
          Something good
        `,
		},
		{
			id: uuid.v4(),
			locale: 'en_US',
			categories: ['money'],
			title: 'How much do I need to make to live in ...?',
			content: `Put something here
          Something good
        `,
		},
		{
			id: uuid.v4(),
			locale: 'en_US',
			categories: ['immigration'],
			title: 'What documents do I need?',
			content: `Put something here
          Something good
        `,
		},
		{
			id: uuid.v4(),
			locale: 'en_US',
			categories: ['immigration'],
			title: 'How do I get a visa?',
			content: `Put something here
          Something good
        `,
		},
		{
			id: uuid.v4(),
			locale: 'en_US',
			categories: ['family'],
			title: 'How can I get a school for my kids?',
			content: `Put something here
          Something good
        `,
		},
		{
			id: uuid.v4(),
			locale: 'en_US',
			categories: ['family'],
			title: 'How does insurance work?',
			content: `Put something here
          Something good
        `,
		},
		{
			id: uuid.v4(),
			locale: 'es_ES',
			categories: ['family'],
			title: 'Como puedo encontrar una escuela?',
			content: `Este texto tiene que estar en espanol.

				Pruebas en otros lenguajes.
        `,
		},
	],
};


module.exports.hello = (event, context, callback) => {
	var service = new Service();

	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
			'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
		},
		body: JSON.stringify(service.hello(event)),
	};

	callback(null, response);
};


module.exports.init = (event, context, callback) => {
	var service = new ArticleService();

	testData.articles.forEach(p => {
		service.save(p);
	});

	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*', // Required for CORS support to work
			'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
		},
		body: JSON.stringify(testData),
	};

	callback(null, response);
};
