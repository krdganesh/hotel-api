/**
 *
 * @type {{API_SUCCESS: {code: number, message: string}, API_FAILURE: {code: number, message: string}, VALIDATION_FAILURE: {code: number, message: string}, DATABASE_FAILURE: {code: number, message: string}, EXTERNAL_FAILURE: {code: number, message: string}, INTERNAL_FAILURE: {code: number, message: string}, INCORRECT_INPUT_DATA_TYPE: {code: number, message: string}, MISSING_INPUT: {code: number, message: string}}}
 */
const STATUS_CODES = {
	API_SUCCESS: {
		code: 200,
		message: 'api operation was successful',
	},
	API_FAILURE: {
		code: 500,
		message: 'api operation was unsuccessful',
	},
	VALIDATION_FAILURE: {
		code: 400,
		message: 'validation failed',
	},
	DATABASE_FAILURE: {
		code: 500,
		message: 'database operation was unsuccessful',
	},
	INCORRECT_INPUT_DATA_TYPE: {
		code: 400,
		message: 'incorrect input data type passed',
	},
	MISSING_INPUT: {
		code: 400,
		message: 'input is missing',
	},
	NOT_FOUND: {
		code: 404,
		message: 'page not found',
	},
};

module.exports = STATUS_CODES;
