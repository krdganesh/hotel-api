import _ from 'lodash';

/**
 * @class ResponseGenerator class is used to generate standard API response
 * @requires status_codes
 * @requires lodash
 */
class ResponseGenerator {
	/**
	 *
	 * @param {object} err any error if exists
	 * @param {object} result response for the api
	 * @param {string} status api status to be returned
	 * @return {object} standardResponse standard api response
	 */
	generateResponse(err, result, status) {
		if (_.isUndefined(err) || _.isUndefined(result) || _.isUndefined(status)) { return null; }
		const standardResponse = {};
		if (!_.isNull(err)) {
			standardResponse.statusCode = status.code;
			standardResponse.message = status.message;
			standardResponse.error = err;
			standardResponse.result = null;
		} else {
			standardResponse.statusCode = status.code;
			standardResponse.message = status.message;
			standardResponse.error = err;
			standardResponse.result = result;
		}
		return standardResponse;
	}
}

export default ResponseGenerator;
