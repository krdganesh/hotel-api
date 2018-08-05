import request from 'supertest';
import server from '../../index';
import testData from '../../rules/testData';

afterEach(() => {
	server.close();
});

let hotel_id

describe('testing POST Hotel ', () => {
	it('should give appropriate error if JSON is not passed ', async () => {
		const result = await request(server)
			.post('/hotel/');
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		expect(typeof result.body.result).toBe('object');
	});

	it('should give appropriate output if JSON is passed ', async () => {
		const result = await request(server)
			.post('/hotel/')
			.send(testData.HOTEL_DATA.SAVE_HOTEL);
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		expect(typeof result.body.result).toBe('string');
		hotel_id = result.body._id
	});
});


describe('testing PUT Hotel', () => {
	it('should give appropriate error if JSON is not passed in put', async () => {
		const result = await request(server)
			.put('/hotel/');
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
	});

	it('should give appropriate output if JSON is passed in put', async () => {
		const result = await request(server)
			.put(`/hotel/${hotel_id}`)
			.send(testData.HOTEL_DATA.UPDATE_HOTEL);
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		expect(typeof result.body.result).toBe('string');
	});
});

describe('testing DELETE Hotel', () => {
	it('should give appropriate error if id is not passed in delete', async () => {
		const result = await request(server)
			.delete('/hotel/');
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
	});

	it('should give appropriate output if id is passed in delete', async () => {
		const result = await request(server)
			.delete(`/hotel/${hotel_id}`)
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		expect(typeof result.body.result).toBe('string');
	});
});

