import Koa from 'koa';
import cors from 'kcors';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import init from './init';
import Apis from './apis/index';
import ErrorMiddleware from './middlewares/errorHandler';

const app = new Koa();
const errorHandler = new ErrorMiddleware();
app.use(bodyParser({
	enableTypes: ['json', 'form'],
	formLimit: '10mb',
	jsonLimit: '10mb',
}));
app.use(logger('dev', {
	skip: () => app.env === 'test',
}));
app.use(cors());
app.use(errorHandler.handle404);
const indexRouter = new Apis();
indexRouter.indexRoutes();
indexRouter.attachRoutes();
app.use(indexRouter.routes());

module.exports = app;
