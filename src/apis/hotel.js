import HotelController from '../controllers/hotelController';

export default class HotelRouter {
	constructor() {
		this.hotelController = new HotelController();
	}

	attachRoutes(router) {
		const self = this;
		return router
			.post('/hotel', self.hotelController.saveHotel)
			.put('/hotel/:_id', self.hotelController.updateHotel)
			.delete('/hotel/:_id', self.hotelController.deleteHotel)
	}
}
