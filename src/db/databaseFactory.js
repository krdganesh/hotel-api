import _ from 'lodash';
import Mongodb from './mongodb';

export default class DatabaseFactory {
	constructor(params) {
		if (_.isNull(params.databaseName) || _.isUndefined(params.databaseName) || !_.isString(params.databaseName)) {
			return new Error('db name is missing. Cannot instantiate a valid database');
		}
		if (_.isNull(params.connectionString) || _.isUndefined(params.connectionString) || !_.isString(params.connectionString)) {
			return new Error('connection string is missing. Cannot connect to the database');
		}
		if (params.databaseName === 'mongodb') {
			return new Mongodb(params.connectionString);
		}
		return new Error(`${params.databaseName} is currently not supported by the database engine`);
	}
}
