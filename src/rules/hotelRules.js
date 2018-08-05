const HOTEL_RULES = {
	SAVE: {
		name: { type: 'string', default: null },
		address: { type: 'string', default: null },
		state: { type: 'string', default: null },
		country: { type: 'string', default: null },
	},
	UPDATE_ID_CHECK:{
		_id:{type:'string', default: null}
	},
	UPDATE_DATA_CHECK: {
		name: { type: 'string', default: null },
		address: { type: 'string', default: null },
		state: { type: 'string', default: null },
		country: { type: 'string', default: null },
	},
};

module.exports = HOTEL_RULES;
