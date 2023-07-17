const { Country, Activity } = require('../db');
const getCountryById = require('../controllers/getCountryById');

describe('getCountryById', () => {
  it('should return the country by ID', async () => {
    const req = {
      params: {
        id: 'AAA'
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const mockCountry = {
      id: 'AAA',
      name: 'Test Country',
      population: 1000000,
      activities: [
        { name: 'Activity 1', difficulty: 3, duration: 2, season: 'Summer' },
        { name: 'Activity 2', difficulty: 2, duration: 1, season: 'Winter' }
      ]
    };

    // Mock the Country.findOne method to return the mockCountry
    Country.findOne = jest.fn().mockResolvedValue(mockCountry);

    await getCountryById(req, res);

    expect(Country.findOne).toHaveBeenCalledWith({
      where: {
        id: 'AAA'
      },
      include: {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season']
      }
    });

    expect(res.json).toHaveBeenCalledWith(mockCountry);
  });

  it('should handle not found country', async () => {
    const req = {
      params: {
        id: 'AAA'
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    // Mock the Country.findOne method to return null
    Country.findOne = jest.fn().mockResolvedValue(null);

    await getCountryById(req, res);

    expect(Country.findOne).toHaveBeenCalledWith({
      where: {
        id: 'AAA'
      },
      include: {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season']
      }
    });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'País no encontrado' });
  });

  it('should handle errors and return an error response', async () => {
    const req = {
      params: {
        id: 'AAA'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Database error');

    // Mock the Country.findOne method to throw an error
    Country.findOne = jest.fn().mockRejectedValue(mockError);

    await getCountryById(req, res);

    expect(Country.findOne).toHaveBeenCalledWith({
      where: {
        id: 'AAA'
      },
      include: {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season']
      }
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener el país' });
  });
});
