import debug from 'debug';
import packageJson from './package.json';


(async function setEnvironmentVariables() {
	process.env.NODE_ENV = (process.env.TIER) ? process.env.TIER : 'development';
	process.env.PORT = process.env.PORT || 80;
	process.env.VERSION = packageJson.version || 'undefined';
	if (process.env.NODE_ENV === 'development') {
		process.env.DEBUG = process.env.DEBUG || 'app,express:router,express:application,debug,te:*';
	}
	const configPath = `./config/${process.env.NODE_ENV}.json`;
	global.config = require(configPath);
	debug(`environment: ${process.env.NODE_ENV}`);
	debug(`version: ${process.env.VERSION}`);
}());