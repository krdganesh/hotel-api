const BOOKING_RULES = {
	SAVE: {
		user_id:{ type: 'string', default: null },
		hotel_id: { type: 'string', default: null },
		room_number: { type: 'string', default: null },
		check_in: { type: 'string', default: null },
		check_out: { type: 'string', default: null },
	}
};

module.exports = BOOKING_RULES;
