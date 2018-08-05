import mongoose from 'mongoose';
import _ from 'lodash';
import Utils from '../libs/utils';

mongoose.Promise = global.Promise;
let instance = null;
const utils = new Utils({});

export default class Mongodb {
	constructor(connectionString) {
		if (_.isNull(instance)) {
			this.db = mongoose.connect(connectionString, { useMongoClient: true });
			this.excludeFields = { _id: 0, __v: 0 };
			instance = this;
		}
		return instance;
	}

	async find(schema, query, exclude) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await utils.invoker(model.findOne(query, exclude));
		return result;
	}

	async findAll(schema, query, exclude) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await utils.invoker(model.find(query, exclude));
		return result;
	}

	async findAndModify(schema, query, data) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await utils.invoker(model.findOneAndUpdate(query, data));
		return result;
	}


	async insert(schema, data) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await utils.invoker(model.create(data));
		return result;
	}

	async delete(schema, query) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await utils.invoker(model.remove(query));
		return result;
	}


	async update(schema, query, data, options) {
		const model = this.db.model(schema.options.collection, schema);
		const result = await utils.invoker(model.update(query, data, options));
		return result;
	}
}
