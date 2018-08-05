import _ from 'lodash';
import mongoose from 'mongoose';
import DatabaseFactory from '../db/databaseFactory';
import bookingSchema from '../models/booking';
import roomsSchema from '../models/rooms';
import userSchema from '../models/user';
import Utils from '../libs/utils';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
const utils = new Utils({});

/**
 * @class Booking class contains all functionalities related to bookings
 * @requires mongoose
 * @requires DatabaseFactory
 * @requires bookingSchema
 * @requires config
 */
class Booking {
    constructor() {
        try {
            this.db = new DatabaseFactory({ databaseName: 'mongodb', connectionString: config.db.mongoDB });
        } catch (e) {
            console.log('failed to connect to mongodb', e);
            process.exit(1);
        }
    }

    async saveBooking(input) {
        if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
            return { err: 'inpunt can not be empty or null while saving Booking', result: null };
        }
        let { err, result } = await utils.invoker(this.getUserDetails(input));
        console.log(err, result)
        if (_.isNull(result.name)) {
            return new Promise(async (resolve, reject) => {
                return reject("Invalid user");
            });
        }
        err, result = await utils.invoker(this.getRoomDetails(input));
        console.log(err, result)
        const start = moment(input.check_in);
        const end = moment(input.check_out);
        const range = moment.range(start, end);
        let roomData = result.result;
        let bookingData = [];

        if (roomData.length == range.diff('days') + 1) {

            for (let i = 0; i < roomData.length; i++) {

                const { err, result } = await utils.invoker(this.markRoomUnavailable(roomData[i]));

                if (!_.isNull(err) || result.availability === false) {
                    for (let j = 0; j < i; j++) {
                        const { err, result } = await utils.invoker(this.markRoomAvailable(roomData[j]));
                    }
                    return new Promise(async (resolve, reject) => {
                        return reject("Could not book room for date(s) specified as this is room booked by other user for one of the date(s)");
                    });
                } else {
                    bookingData.push({
                        _id: mongoose.Types.ObjectId(),
                        user_id: input.user_id,
                        hotel_id: roomData[i].hotel_id,
                        room_id: roomData[i]._id,
                        room_number: roomData[i].room_number,
                        room_type: roomData[i].room_type,
                        booking_date: roomData[i].date,
                        time_stamp: Date.now()
                    })
                }
            }
        } else {
            return new Promise(async (resolve, reject) => {
                return reject("Room is not available for given date range");
            });
        }

        console.log(bookingData)
        return new Promise(async (resolve, reject) => {
            const { err, result } = await this.db.insert(bookingSchema.schema, bookingData);
            if (!_.isNull(err)) {
                for (let i = 0; i < roomData.length; i++) {
                    const { err, result } = await utils.invoker(this.markRoomAvailable(roomData[i]));
                }
            }
            return (!_.isNull(err)) ? reject(err) : resolve(result);
        });
    }

    async getUserDetails(input) {
        if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
            return { err: 'inpunt can not be empty or null while getting user details', result: null };
        }

        return new Promise(async (resolve, reject) => {
            let output = { err: null, result: null };
            const query = { _id: input.user_id };
            output = await this.db.find(userSchema.schema, query);
            const result = (_.isNull(output.result)) ? output.err : output.result;
            return (!_.isNull(output.err)) ? reject(output.err) : resolve(result);
        });
    }

    async getRoomDetails(input) {
        if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
            return { err: 'inpunt can not be empty or null while getting room details', result: null };
        }

        return new Promise(async (resolve, reject) => {
            let output = { err: null, result: null };
            const query = { hotel_id: input.hotel_id, room_number: input.room_number, date: { $gte: input.check_in, $lte: input.check_out }, availability: true };
            output = await this.db.findAll(roomsSchema.schema, query);
            const result = (_.isNull(output.result)) ? output.err : output.result;
            return (!_.isNull(output.err)) ? reject(output.err) : resolve(result);
        });
    }

    async markRoomUnavailable(input) {
        if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
            return { err: 'input can not be empty or null while marking room unavailable', result: null };
        }
        return new Promise(async (resolve, reject) => {
            const query = { _id: input._id };
            const { err, result } = await this.db.findAndModify(roomsSchema.schema, query, { availability: false });
            return (!_.isNull(err)) ? reject(err) : resolve(result);
        });
    }

    async markRoomAvailable(input) {
        if (_.isNull(input) || _.isUndefined(input) || _.isEmpty(input)) {
            return { err: 'input can not be empty or null while marking room available', result: null };
        }
        return new Promise(async (resolve, reject) => {
            const query = { _id: input._id };
            const { err, result } = await this.db.findAndModify(roomsSchema.schema, query, { availability: true });
            return (!_.isNull(err)) ? reject(err) : resolve(result);
        });
    }
}

export default Booking;
