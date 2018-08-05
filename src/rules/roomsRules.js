const ROOMS_RULES = {
	SAVE: {
		hotel_id: { type: 'string', default: null },
		room_number: { type: 'string', default: null },
		room_type: { type: 'string', default: null },
		date: { type: 'string', default: null },
		availability: { type: 'boolean', default: null },
	},
	GET: {
		hotel_id: { type: 'string', default: null },
		check_in: { type: 'string', default: null },
		check_out: { type: 'string', default: null },
		// room_type: { type: 'string', default: null },
	},
};

module.exports = ROOMS_RULES;
