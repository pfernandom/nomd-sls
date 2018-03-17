import UserService from 'services/UserService';

const userService = new UserService();

const UserController = {

	authenticate: (args) => {
		console.log('args.user', args.user);

		return userService.authenticate(args.user);
	},

};

module.exports = UserController;
