const USER_RULES = {
	SAVE: {
		name: { type: 'string', default: null },
		email: { type: 'string', default: null },
		mobile: { type: 'number', default: null },
		gender: { type: 'string', default: null },
	},
	UPDATE_ID_CHECK:{
		_id:{type:'string', default: null}
	},
	UPDATE_DATA_CHECK: {
		name: { type: 'string', default: null },
		email: { type: 'string', default: null },
		mobile: { type: 'number', default: null },
		gender: { type: 'string', default: null },
	},
};

module.exports = USER_RULES;
