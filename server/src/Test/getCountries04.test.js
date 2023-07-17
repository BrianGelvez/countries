const { Country } = require('../db');
const getCountries = require('../controllers/getCountries');

describe('getCountries', () => {
  it('should return all countries', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    const mockCountries = [
      { name: 'Country 1', population: 1000000 },
      { name: 'Country 2', population: 2000000 },
      { name: 'Country 3', population: 3000000 }
    ];

    // Mock the Country.findAll method to return the mockCountries array
    Country.findAll = jest.fn().mockResolvedValue(mockCountries);

    await getCountries(req, res);

    expect(res.json).toHaveBeenCalledWith(mockCountries);
  });
});
