
import server from '../../index';
import User from '../user';
import testData from '../../rules/testData';

afterEach(() => {
	server.close();
});
const user = new User();
let user_id

describe('Testing saveUser() function', () => {
	it('returns correct response when input is correct', async () => {
		const result = await user.saveUser(testData.USER_DATA.SAVE_USER);
		expect(typeof result).toBe('object');
		user_id = result._id
	});

	it('returns null response when null is passed', async () => {
		const result = await user.saveUser(null);
		expect(result.result).toBe(null);
	});

	it('returns null response when undefined is passed', async () => {
		const result = await user.saveUser(undefined);
		expect(result.result).toBe(null);
	});

	it('returns null response when blank value is passed', async () => {
		const result = await user.saveUser();
		expect(result.result).toBe(null);
	});
});

describe('Testing updateUser() function', () => {
	it('returns correct response when input is correct', async () => {
		const result = await user.updateUser({ _id: user_id}, testData.USER_DATA.UPDATE_USER);
		expect(typeof result).toBe('object');
	});

	it('returns error response when incorrect input passed', async () => {
		const result = await user.updateUser({ abc: 'sdasdf' }, '');
		expect(typeof result).toBe('object');
	});

	it('returns null response when null is passed', async () => {
		const result = await user.updateUser(null, null);
		expect(result.result).toBe(null);
	});

	it('returns null response when undefined is passed', async () => {
		const result = await user.updateUser(undefined, undefined);
		expect(result.result).toBe(null);
	});

	it('returns null response when blank value is passed', async () => {
		const result = await user.updateUser();
		expect(result.result).toBe(null);
	});
});


describe('Testing deleteUser() function', () => {
	it('returns correct response when input is correct', async () => {
		const result = await user.deleteUser({ _id: user_id});
		expect(typeof result).toBe('object');
	});

	it('returns error response when incorrect input passed', async () => {
		const result = await user.deleteUser({ abc: 'sdasdf' }, '');
		expect(typeof result).toBe('object');
	});

	it('returns null response when null is passed', async () => {
		const result = await user.deleteUser(null, null);
		expect(result.result).toBe(null);
	});

	it('returns null response when undefined is passed', async () => {
		const result = await user.deleteUser(undefined, undefined);
		expect(result.result).toBe(null);
	});

	it('returns null response when blank value is passed', async () => {
		const result = await user.deleteUser();
		expect(result.result).toBe(null);
	});
});

