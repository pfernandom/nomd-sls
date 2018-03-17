import uuid from 'uuid';
import dynamodb from 'serverless-dynamodb-client';
import {removeEmptyStringElements} from '../utils/Common';

const USERS_TABLE_NAME = 'Users';

/*
sub: String!
nickname: String,
picture: String
name: String
given_name: String,
family_name: String,
country: String,
timezone: String
*/

export default class UserService{
	constructor(){
		this.db = dynamodb.doc;
	}
	_generateToken(){
		return uuid.v4();
	}
	authenticate(user){
		return this.getUser(user.sub).then(data => {
			console.log('user found', data);
			if (!data){
				return this.createUser(user).then(result => {
					console.log('user created', result);
					return Object.assign(user, result);
				});
			}
			return data;
		});
	}
	createUser(user){
		let id = uuid.v4();

		user.sub = user.sub || id;

		var params = {
			TableName: USERS_TABLE_NAME,
			Item: removeEmptyStringElements(user),
		};

		return this.db.put(params).promise().then(data => {
			data = Object.assign({id: id}, data);
			return data;
		});
	}
	getUser(sub){
		var params = {
			TableName: USERS_TABLE_NAME,
			KeyConditionExpression: '#sub = :idValue',
			ExpressionAttributeNames: {
				'#sub': 'sub',
			},
			ExpressionAttributeValues: {
				':idValue': sub,
			},
		};
		return this.db.query(params).promise().then(data => {
			return data.Items[0];
		});
	}
	isRegistered(id){
		console.log('id', id);
		return id === 'linkedin|CjstK2EkLJ';
	}
	register(newUser, code){
		console.log('Registerind', {userId: newUser.sub, code: code});
		return true;
	}

}
