import _ from 'lodash';
import Rooms from '../modules/rooms';
import ResponseGenerator from '../libs/responseGenerator';
import statusCodes from '../libs/status_codes';
import CustomError from '../libs/customError';
import Utils from '../libs/utils';
import RoomsRules from '../rules/roomsRules';


const responseGenerator = new ResponseGenerator();
const rooms = new Rooms();
const utils = new Utils({});

export default class RoomsController {
	/**
	 * Saves Rooms in the database.
	 * @param {ctx} koa-context-object - this field contains the POST data.
	 * @returns {object} response The standard api response
	 */
    async saveRooms(ctx) {
        const validate = utils.validateParams(RoomsRules.SAVE, ctx.request.body, false);
        if (!validate.err) {
            const { err, result } = await utils.invoker(rooms.saveRooms(ctx.request.body));
            let response = {};
            if (!_.isNull(err)) {
                let error = {};
                if (!err.code === 11000) {
                    error = new CustomError('database operation failed', 'Rooms could not be inserted');
                    response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
                    ctx.status = statusCodes.DATABASE_FAILURE.code;
                } else {
                    error = new CustomError(`Rooms : ${validate.room_number} is already present in DB with same properties, Rooms could not be inserted.`, 'rooms could not be inserted');
                    response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
                    ctx.status = statusCodes.DATABASE_FAILURE.code;
                }
            } else {
                const customResult = 'Rooms saved successfully';
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

    /**
	 * GET's the available rooms based on hotel_id, date range with optional room_type.
	 *
	 * @param {ctx} koa-context-object - this field contains the GET data.
	 * @returns {Object} response the function returns the api response.
	 */
	async getAvailableRooms(ctx) {
		const validate = utils.validateParams(RoomsRules.GET, ctx.query, false);
		const queryParams = ctx.query;
		if (!validate.err) {
			const { err, result } = await utils.invoker(rooms.getAvailableRooms(queryParams));
			let response = {};
			if (!_.isNull(err)) {
				const error = new CustomError('database operation failed', 'Available rooms could not be fetched');
				response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
				ctx.status = statusCodes.DATABASE_FAILURE.code;
			} else if (_.isNull(result) || _.isEmpty(result)) {
				const error = 'could not find anything matching your query';
				response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
				ctx.status = statusCodes.DATABASE_FAILURE.code;
			} else {
				response = responseGenerator.generateResponse(err, result, statusCodes.API_SUCCESS);
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
