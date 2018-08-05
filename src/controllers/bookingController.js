import _ from 'lodash';
import Booking from '../modules/booking';
import ResponseGenerator from '../libs/responseGenerator';
import statusCodes from '../libs/status_codes';
import CustomError from '../libs/customError';
import Utils from '../libs/utils';
import BookingRules from '../rules/bookingRules';

const responseGenerator = new ResponseGenerator();
const booking = new Booking();
const utils = new Utils({});

export default class BookingController {
	/**
	 * Saves Booking in the database.
	 * @param {ctx} koa-context-object - this field contains the POST data.
	 * @returns {object} response The standard api response
	 */
    async saveBooking(ctx) {
        const validate = utils.validateParams(BookingRules.SAVE, ctx.request.body, false);
        if (!validate.err) {
            const { err, result } = await utils.invoker(booking.saveBooking(ctx.request.body));
            let response = {};
            if (!_.isNull(err)) {
                let error = {};
                error = new CustomError('database operation failed', err + ', Booking could not be inserted');
                response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
                ctx.status = statusCodes.DATABASE_FAILURE.code;
            } else {
                const customResult = 'Room booked successfully';
                response = responseGenerator.generateResponse(err, customResult, statusCodes.API_SUCCESS);
                ctx.status = statusCodes.API_SUCCESS.code;
            }
            ctx.body = response;
        } else {
            const error = new CustomError('Validation failed', validate.err);
            const response = responseGenerator.generateResponse(error, null, statusCodes.VALIDATION_FAILURE);
            ctx.status = statusCodes.VALIDATION_FAILURE.code;
            ctx.body = response;
        }
    }
}
