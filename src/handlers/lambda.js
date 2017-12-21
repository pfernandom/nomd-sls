
'use strict'

const awsServerlessExpress = require('aws-serverless-express');
const app = require('../app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context,callback) => {
  context.succeed = (response) => {
      server.close();
			callback(null, response);
  };
  return awsServerlessExpress.proxy(server, event, context)

};
