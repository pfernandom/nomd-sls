	import uuid from 'uuid';
	import dynamodb from 'serverless-dynamodb-client';
	import ValidationUtils from '../utils/ValidationUtils';

	class Service{
		constructor(){
			this.db = dynamodb.doc;
			this.v = new ValidationUtils();
		}

		hello(event){
			return {
			  message: 'Go Serverless v1.0! Your function executed successfully!',
			  input: event,
			}
		}

		save(record){
			let id = uuid.v4();
			var params = {
				TableName:'MyTable',
				Item:Object.assign({
					"id": id
				}, record)
			};

			return this.v.validate(record, "/MyRecord").then(data => {
				return this.db.put(params).promise().then(data => {
					data = Object.assign({id:id},data);
					return data;
				});
			});
		}
		get(id){
			var params = {
				TableName:'MyTable',
				KeyConditionExpression: "#id = :idValue",
				ExpressionAttributeNames:{
					"#id": "id"
				},
				ExpressionAttributeValues: {
					":idValue":id
				}
			};

			return this.db.query(params).promise();
		}
	}

	module.exports = Service;
