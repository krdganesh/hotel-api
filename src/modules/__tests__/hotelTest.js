
import server from '../../index';
import Hotel from '../hotel';
import testData from '../../rules/testData';

afterEach(() => {
	server.close();
});
const hotel = new Hotel();
let hotel_id

describe('Testing saveHotel() function', () => {
	it('returns correct response when input is correct', async () => {
		const result = await hotel.saveHotel(testData.HOTEL_DATA.SAVE_HOTEL);
		expect(typeof result).toBe('object');
		hotel_id = result._id
	});

	it('returns null response when null is passed', async () => {
		const result = await hotel.saveHotel(null);
		expect(result.result).toBe(null);
	});

	it('returns null response when undefined is passed', async () => {
		const result = await hotel.saveHotel(undefined);
		expect(result.result).toBe(null);
	});

	it('returns null response when blank value is passed', async () => {
		const result = await hotel.saveHotel();
		expect(result.result).toBe(null);
	});
});

describe('Testing updateHotel() function', () => {
	it('returns correct response when input is correct', async () => {
		const result = await hotel.updateHotel({ _id: hotel_id}, testData.HOTEL_DATA.UPDATE_HOTEL);
		expect(typeof result).toBe('object');
	});

	it('returns error response when incorrect input passed', async () => {
		const result = await hotel.updateHotel({ abc: 'sdasdf' }, '');
		expect(typeof result).toBe('object');
	});

	it('returns null response when null is passed', async () => {
		const result = await hotel.updateHotel(null, null);
		expect(result.result).toBe(null);
	});

	it('returns null response when undefined is passed', async () => {
		const result = await hotel.updateHotel(undefined, undefined);
		expect(result.result).toBe(null);
	});

	it('returns null response when blank value is passed', async () => {
		const result = await hotel.updateHotel();
		expect(result.result).toBe(null);
	});
});


describe('Testing deleteHotel() function', () => {
	it('returns correct response when input is correct', async () => {
		const result = await hotel.deleteHotel({ _id: hotel_id});
		expect(typeof result).toBe('object');
	});

	it('returns error response when incorrect input passed', async () => {
		const result = await hotel.deleteHotel({ abc: 'sdasdf' }, '');
		expect(typeof result).toBe('object');
	});

	it('returns null response when null is passed', async () => {
		const result = await hotel.deleteHotel(null, null);
		expect(result.result).toBe(null);
	});

	it('returns null response when undefined is passed', async () => {
		const result = await hotel.deleteHotel(undefined, undefined);
		expect(result.result).toBe(null);
	});

	it('returns null response when blank value is passed', async () => {
		const result = await hotel.deleteHotel();
		expect(result.result).toBe(null);
	});
});

