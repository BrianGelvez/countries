const { Op } = require('sequelize');
const { Country } = require('../db');
const getCountriesByName = require('../controllers/getCountriesByName');

describe('getCountriesByName', () => {
  it('should return matching countries by name', async () => {
    const req = {
      query: {
        name: 'Germany'
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const mockCountries = [
      { name: 'Germany', population: 83000000 },
      { name: 'Austria', population: 8900000 },
      { name: 'Switzerland', population: 8400000 }
    ];

    // Mock the Country.findAll method to return the mockCountries array
    Country.findAll = jest.fn().mockResolvedValue(mockCountries);

    await getCountriesByName(req, res);

    expect(Country.findAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.iLike]: '%Germany%'
        }
      }
    });

    expect(res.json).toHaveBeenCalledWith(mockCountries);
  });

  it('should handle not found countries', async () => {
    const req = {
      query: {
        name: 'Invalid Country'
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    // Mock the Country.findAll method to return an empty array
    Country.findAll = jest.fn().mockResolvedValue([]);

    await getCountriesByName(req, res);

    expect(Country.findAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.iLike]: '%Invalid Country%'
        }
      }
    });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No se encontraron países' });
  });

  it('should handle errors and return an error response', async () => {
    const req = {
      query: {
        name: 'Germany'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Database error');

    // Mock the Country.findAll method to throw an error
    Country.findAll = jest.fn().mockRejectedValue(mockError);

    await getCountriesByName(req, res);

    expect(Country.findAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.iLike]: '%Germany%'
        }
      }
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener los países' });
  });
});
