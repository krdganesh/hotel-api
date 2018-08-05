const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Schema Definition */
const user = new Schema({
    _id: { type: String, required: true },
    name: String,
    email: String,
    mobile: Number,
    gender: String
}, { collection: 'users' });

module.exports.schema = user;
