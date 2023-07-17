const createActivity = require('../controllers/createActivity');
const { Country, Activity } = require('../db');


describe('createActivity', () => {
  it("test_create_activity_invalid_country_name",async () => {
    const req = {
      body: {
        name: 'Test Activity',
        difficulty: 3,
        duration: 5,
        season: 'Summer',
        countries: ['Invalid Country']
      }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock the Activity.create and Country.findOne methods
    Activity.create = jest.fn();
    Country.findOne = jest.fn();

    await createActivity(req, res);

    // Check if the Activity.create method was called with the correct arguments
    expect(Activity.create).toHaveBeenCalledWith({
      name: 'Test Activity',
      difficulty: 3,
      duration: 5,
      season: 'Summer'
    })
    expect(res.json).toHaveBeenCalledWith({ message: 'Actividad turística creada exitosamente' });
  });
});
