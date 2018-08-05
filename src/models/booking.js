const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Schema Definition */
const booking = new Schema({
    _id: { type: String, required: true },
    user_id: String,
    hotel_id: String,
    room_id: String,
    room_number: String,
    room_type: String,
    booking_date: Date,
    time_stamp: Date,
}, { collection: 'bookings' });

module.exports.schema = booking;