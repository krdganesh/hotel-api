import KoaRouter from 'koa-router';
import Hotel from './hotel';
import User from './user';
import Rooms from './rooms';
import Booking from './booking';

export default class IndexRouter extends KoaRouter {
	constructor() {
		super();
		const self = this;
		self.hotelRouter = new Hotel();
		self.userRouter = new User();
		self.roomsRouter = new Rooms();
		self.bookingRouter = new Booking();
	}

	attachRoutes() {
		const self = this;
		self.hotelRouter.attachRoutes(self);
		self.userRouter.attachRoutes(self);
		self.roomsRouter.attachRoutes(self);
		self.bookingRouter.attachRoutes(self);
	}

	indexRoutes() {
		this.get('/', async (ctx) => {
			ctx.body = {
				appName: 'Hotel Management System',
				author: 'Ganesh Karande',
			};
		});
	}
}
