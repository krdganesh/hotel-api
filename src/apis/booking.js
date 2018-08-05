import BookingController from '../controllers/bookingController';

export default class BookingRouter {
	constructor() {
		this.bookingController = new BookingController();
	}

	attachRoutes(router) {
		const self = this;
		return router
			.post('/booking', self.bookingController.saveBooking)
	}
}
