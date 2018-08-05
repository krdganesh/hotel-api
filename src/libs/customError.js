/**
 * @class CustomError class contains all custom error functions
 * CustomUtils extends Nodejs Base Error class.
 */
class CutomError extends Error {
	constructor(message, extra) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.message = message;
		this.extra = extra;
	}
}

export default CutomError;