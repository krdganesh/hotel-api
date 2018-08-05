import RoomsController from '../controllers/roomsController';

export default class RoomsRouter {
	constructor() {
		this.roomsController = new RoomsController();
	}

	attachRoutes(router) {
		const self = this;
		return router
			.post('/rooms', self.roomsController.saveRooms)
			.get('/rooms/available', self.roomsController.getAvailableRooms)
	}
}
