class ErrorHandler {
	async handle404(ctx, next) {
		try {
			await next();
			if (ctx.status === 404) {
				ctx.throw(404);
			}
		} catch (err) {
			ctx.status = err.statusCode || err.status || 500;
			ctx.body = {
				statusCode: ctx.status,
				message: err.message,
			};
			ctx.app.emit('error', err, ctx);
		}
	}
}

module.exports = ErrorHandler;
