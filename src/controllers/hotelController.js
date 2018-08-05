import _ from 'lodash';
import Hotel from '../modules/hotel';
import ResponseGenerator from '../libs/responseGenerator';
import statusCodes from '../libs/status_codes';
import CustomError from '../libs/customError';
import Utils from '../libs/utils';
import HotelRules from '../rules/hotelRules';


const responseGenerator = new ResponseGenerator();
const hotel = new Hotel();
const utils = new Utils({});

export default class HotelController {
	/**
	 * Saves Hotel in the database.
	 * @param {ctx} koa-context-object - this field contains the POST data.
	 * @returns {object} response The standard api response
	 */
	async saveHotel(ctx) {
		const validate = utils.validateParams(HotelRules.SAVE, ctx.request.body, false);
		if (!validate.err) {
			const { err, result } = await utils.invoker(hotel.saveHotel(ctx.request.body));
			let response = {};
			if (!_.isNull(err)) {
				let error = {};
				if (!err.code === 11000) {
					error = new CustomError('database operation failed', 'Hotel could not be inserted');
					response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
					ctx.status = statusCodes.DATABASE_FAILURE.code;
				} else {
					error = new CustomError(`Hotel : ${validate.name} is already present in DB with same properties, Hotel could not be inserted.`, 'hotel could not be inserted');
					response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
					ctx.status = statusCodes.DATABASE_FAILURE.code;
				}
			} else {
				const customResult = 'Hotel saved successfully';
				response = responseGenerator.generateResponse(err, customResult, statusCodes.API_SUCCESS);
				response._id = result._id;
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

	async updateHotel(ctx) {
		const queryParams = ctx.params;
		const data = ctx.request.body;
		const validateQuery = utils.validateParams(HotelRules.UPDATE_ID_CHECK, queryParams, false);
		const validateData = utils.validateParams(HotelRules.UPDATE_DATA_CHECK, data, false);
		if (!validateQuery.err && !validateData.err) {
			const { err, result } = await utils.invoker(hotel.updateHotel(queryParams, data));
			let response = {};
			if (!_.isNull(err)) {
				if (!err.code === 11000) {
					const error = new CustomError('database operation failed', 'Hotel could not be updated');
					response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
					ctx.status = statusCodes.DATABASE_FAILURE.code;
				} else {
					const error = new CustomError(`Hotel : ${validateData.name} is already present in DB with same properties, Hotel could not be updated.`, 'hotel could not be updated');
					response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
					ctx.status = statusCodes.DATABASE_FAILURE.code;
				}
			} else {
				const customResult = 'Hotel updated successfully';
				response = responseGenerator.generateResponse(err, customResult, statusCodes.API_SUCCESS);
				ctx.status = statusCodes.API_SUCCESS.code;
			}
			ctx.body = response;
		} else {
			const error = new CustomError('Validation failed', validateQuery.err, validateData.err);
			const response = responseGenerator.generateResponse(error, null, statusCodes.VALIDATION_FAILURE);
			ctx.status = statusCodes.VALIDATION_FAILURE.code;
			ctx.body = response;
		}
	}

	async deleteHotel(ctx) {
		const queryParams = ctx.params;
		const data = ctx.request.body;
		const validateQuery = utils.validateParams(HotelRules.UPDATE_ID_CHECK, queryParams, false);
		if (!validateQuery.err) {
			const { err, result } = await utils.invoker(hotel.deleteHotel(queryParams));
			let response = {};
			if (!_.isNull(err)) {
				const error = new CustomError('database operation failed', 'Hotel could not be deleted');
				response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
				ctx.status = statusCodes.DATABASE_FAILURE.code;
			} else if (result.result.n > 0) {
				const customResult = 'Hotel deleted successfully';
				response = responseGenerator.generateResponse(err, customResult, statusCodes.API_SUCCESS);
				ctx.status = statusCodes.API_SUCCESS.code;
			}
			else {
				const error = new CustomError('database operation failed', 'Hotel could not be found');
				response = responseGenerator.generateResponse(error, result, statusCodes.DATABASE_FAILURE);
				ctx.status = statusCodes.DATABASE_FAILURE.code;
			}
			ctx.body = response;
		} else {
			const error = new CustomError('Validation failed', validateQuery.err);
			const response = responseGenerator.generateResponse(error, null, statusCodes.VALIDATION_FAILURE);
			ctx.status = statusCodes.VALIDATION_FAILURE.code;
			ctx.body = response;
		}
	}
}
