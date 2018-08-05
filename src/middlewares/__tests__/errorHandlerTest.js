import request from 'supertest';
import server from '../../index';

afterEach(() => {
	server.close();
});

describe('Testing all error handler middlewares', () => {
	it('unreachable route should return 404 status code and relevant message', async () => {
		const result = await request(server).get('/someWrongRoute');
		expect(result.body).toEqual({ statusCode: 404, message: 'Not Found' });
	});

	it('/ route should return statuscode as 200', async () => {
		await request(server).get('/').expect(200);
		const result = await request(server).get('/');
		expect(result.body).toEqual({ appName: 'Hotel Management System', author: 'Ganesh Karande' });
	});
});
