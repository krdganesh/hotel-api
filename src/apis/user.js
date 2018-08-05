import UserController from '../controllers/userController';

export default class UserRouter {
	constructor() {
		this.userController = new UserController();
	}

	attachRoutes(router) {
		const self = this;
		return router
			.post('/user', self.userController.saveUser)
			.put('/user/:_id', self.userController.updateUser)
			.delete('/user/:_id', self.userController.deleteUser)
	}
}
