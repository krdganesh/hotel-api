import _ from 'lodash';
import mongoose from 'mongoose';
import DatabaseFactory from '../db/databaseFactory';
import userSchema from '../models/user';


/**
 * @class User class contains all functionalities related to users
 * @requires mongoose
 * @requires DatabaseFactory
 * @requires userSchema
 * @requires config
 */
class User {
	constructor() {
		try {
			this.db = new DatabaseFactory({ databaseName: 'mongodb', connectionString: config.db.mongoDB });
		} catch (e) {
			console.log('failed to connect to mongodb', e);
			process.exit(1);
		}
	}

	async saveUser(input) {
		if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
			return { err: 'inpunt can not be empty or null while saving user', result: null };
		}
		return new Promise(async (resolve, reject) => {
			const data = _.cloneDeep(input);
			data._id = mongoose.Types.ObjectId();
			const { err, result } = await this.db.insert(userSchema.schema, data);
			return (!_.isNull(err)) ? reject(err) : resolve(result);
		});
	}

	updateUser(queryParams, data) {
		if (_.isNull(queryParams) || _.isUndefined(queryParams) || _.isEmpty(queryParams) || _.isNull(data) || _.isUndefined(data) || _.isEmpty(data)) { 
			return { err: 'queryParams or data can not be empty or null while updating user', result: null };
		}
		return new Promise(async (resolve, reject) => {
			const query = { _id: queryParams._id };
			const options = { returnOriginal: false };
			const { err, result } = await this.db.update(userSchema.schema, query, data, options);
			return (!_.isNull(err)) ? reject(err) : resolve(result);
		});
	}

	deleteUser(queryParams) {
		if (_.isNull(queryParams) || _.isUndefined(queryParams) || _.isEmpty(queryParams)) { 
			return { err: 'queryParams or data can not be empty or null while deleting user', result: null };
		}
		return new Promise(async (resolve, reject) => {
			const query = { _id: queryParams._id };
			const options = { returnOriginal: false };
			const { err, result } = await this.db.delete(userSchema.schema, query);
			return (!_.isNull(err)) ? reject(err) : resolve(result);
		});
	}
}

export default User;
