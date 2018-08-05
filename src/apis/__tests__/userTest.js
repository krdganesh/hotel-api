import request from 'supertest';
import server from '../../index';
import testData from '../../rules/testData';

afterEach(() => {
	server.close();
});

let user_id

describe('testing POST User ', () => {
	it('should give appropriate error if JSON is not passed ', async () => {
		const result = await request(server)
			.post('/user/');
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		expect(typeof result.body.result).toBe('object');
	});

	it('should give appropriate output if JSON is passed ', async () => {
		const result = await request(server)
			.post('/user/')
			.send(testData.USER_DATA.SAVE_USER);
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		// expect(typeof result.body.result).toBe('object');
		user_id = result.body._id
	});
});


describe('testing PUT User', () => {
	it('should give appropriate error if JSON is not passed in put', async () => {
		const result = await request(server)
			.put('/user/');
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
	});

	it('should give appropriate output if JSON is passed in put', async () => {
		const result = await request(server)
			.put(`/user/${user_id}`)
			.send(testData.USER_DATA.UPDATE_USER);
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		expect(typeof result.body.result).toBe('string');
	});
});

describe('testing DELETE User', () => {
	it('should give appropriate error if id is not passed in delete', async () => {
		const result = await request(server)
			.delete('/user/');
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
	});

	it('should give appropriate output if id is passed in delete', async () => {
		const result = await request(server)
			.delete(`/user/${user_id}`)
		expect(typeof result.body).toBe('object');
		expect(typeof result.body.statusCode).toBe('number');
		expect(typeof result.body.message).toBe('string');
		expect(typeof result.body.error).toBe('object');
		// expect(typeof result.body.result).toBe('object');
	});
});

