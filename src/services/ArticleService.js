import uuid from 'uuid';
import dynamodb from 'serverless-dynamodb-client';
import {removeEmptyStringElements} from '../utils/Common';

const TABLE_NAME = 'Articles';

class ArticleService{
	constructor(){
		this.db = dynamodb.doc;
	}

	findAll(){
		var params = {
			TableName: TABLE_NAME,
		};
		return this.db.scan(params).promise().then(data => {
			console.log('data', data);
			return data;
		});
	}

	save(record){
		let id = uuid.v4();

		var params = {
			TableName: TABLE_NAME,
			Item: Object.assign({
				id: id,
			}, removeEmptyStringElements(record)),
		};

		console.log('Saving... ', params);
		return this.db.put(params).promise().then(data => {
			data = Object.assign({id: id}, data);
			return data;
		});
	}

	update(record){
		var params = {
			TableName: TABLE_NAME,
			Item: record,
		};

		console.log('Updating... ');
		return this.db.update(params).promise().then(data => {
			data = Object.assign({id: record.id}, data);
			return data;
		});
	}

	get(id){
		console.log('Getting patient for ', id);
		var params = {
			TableName: TABLE_NAME,
			KeyConditionExpression: '#id = :idValue',
			ExpressionAttributeNames: {
				'#id': 'id',
			},
			ExpressionAttributeValues: {
				':idValue': id,
			},
		};
		return this.db.query(params).promise().then(data => {
			console.log('Found patient ', data);
			return data.Items[0];
		});
	}
}

module.exports = ArticleService;
