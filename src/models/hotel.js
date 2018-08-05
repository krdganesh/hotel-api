const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Schema Definition */
const hotel = new Schema({
    _id: { type: String, required: true },
    name: String,
    address: String,
    state: String,
    country: String,
}, { collection: 'hotels' });

module.exports.schema = hotel;
