const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Schema Definition */
const rooms = new Schema({
    _id: { type: String, required: true },
    hotel_id: String,
    room_number: String,
    room_type: String,
    date:Date,
    availability: Boolean,    
}, { collection: 'rooms' });

module.exports.schema = rooms;
