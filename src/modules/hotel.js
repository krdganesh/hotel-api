import _ from 'lodash';
import mongoose from 'mongoose';
import DatabaseFactory from '../db/databaseFactory';
import hotelSchema from '../models/hotel';


/**
 * @class Hotel class contains all functionalities related to hotels
 * @requires mongoose
 * @requires DatabaseFactory
 * @requires hotelSchema
 * @requires config
 */
class Hotel {
	constructor() {
		try {
			this.db = new DatabaseFactory({ databaseName: 'mongodb', connectionString: config.db.mongoDB });
		} catch (e) {
			console.log('failed to connect to mongodb', e);
			process.exit(1);
		}
	}

	async saveHotel(input) {
		if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
			return { err: 'inpunt can not be empty or null while saving Hotel', result: null };
		}
		return new Promise(async (resolve, reject) => {
			const data = _.cloneDeep(input);
			data._id = mongoose.Types.ObjectId();
			const { err, result } = await this.db.insert(hotelSchema.schema, data);
			return (!_.isNull(err)) ? reject(err) : resolve(result);
		});
	}

	updateHotel(queryParams, data) {
		if (_.isNull(queryParams) || _.isUndefined(queryParams) || _.isEmpty(queryParams) || _.isNull(data) || _.isUndefined(data) || _.isEmpty(data)) { 
			return { err: 'queryParams or data can not be empty or null while updating hotel', result: null };
		}
		return new Promise(async (resolve, reject) => {
			const query = { _id: queryParams._id };
			const options = { returnOriginal: false };
			const { err, result } = await this.db.update(hotelSchema.schema, query, data, options);
			return (!_.isNull(err)) ? reject(err) : resolve(result);
		});
	}

	deleteHotel(queryParams) {
		if (_.isNull(queryParams) || _.isUndefined(queryParams) || _.isEmpty(queryParams)) { 
			return { err: 'queryParams or data can not be empty or null while deleting hotel', result: null };
		}
		return new Promise(async (resolve, reject) => {
			const query = { _id: queryParams._id };
			const options = { returnOriginal: false };
			const { err, result } = await this.db.delete(hotelSchema.schema, query);
			return (!_.isNull(err)) ? reject(err) : resolve(result);
		});
	}
}

export default Hotel;
