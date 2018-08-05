import _ from 'lodash';
import mongoose from 'mongoose';
import DatabaseFactory from '../db/databaseFactory';
import roomsSchema from '../models/rooms';


/**
 * @class Rooms class contains all functionalities related to rooms
 * @requires mongoose
 * @requires DatabaseFactory
 * @requires roomsSchema
 * @requires config
 */
class Rooms {
	constructor() {
		try {
			this.db = new DatabaseFactory({ databaseName: 'mongodb', connectionString: config.db.mongoDB });
		} catch (e) {
			console.log('failed to connect to mongodb', e);
			process.exit(1);
		}
	}

	async saveRooms(input) {
		if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
			return { err: 'inpunt can not be empty or null while saving Rooms', result: null };
		}
		return new Promise(async (resolve, reject) => {
			const data = _.cloneDeep(input);
			data._id = mongoose.Types.ObjectId();
			const { err, result } = await this.db.insert(roomsSchema.schema, data);
			return (!_.isNull(err)) ? reject(err) : resolve(result);
		});
	}

	async getAvailableRooms(input) {
		if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
			return { err: 'inpunt can not be empty or null while getting available rooms', result: null };
		}
		return new Promise(async (resolve, reject) => {
			let output = { err: null, result: null };
			const query = { hotel_id: input.hotel_id, date: { $gte: input.check_in, $lte: input.check_out }, availability: true };
			if (!_.isNull(input.room_type) && !_.isUndefined(input.room_type) && !_.isEmpty(input.room_type)) {
				query.room_type = input.room_type;
			}
			output = await this.db.findAll(roomsSchema.schema, query, this.db.excludeFields);

			const result = (_.isNull(output.result)) ? output.err : output.result;
			return (!_.isNull(output.err)) ? reject(output.err) : resolve(result);
		});
	}
}

export default Rooms;
