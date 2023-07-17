const getActivities = require('../controllers/getActivities')
const { Activity } = require('../db');


describe('getActivities', () => {
    it('test_empty_activities', async () => {
        const req = {};
        const res = {
          json: jest.fn()
        };
        Activity.findAll = jest.fn().mockResolvedValue([]);
  
        await getActivities(req, res);
  
        expect(res.json).toHaveBeenCalledWith([]);
      });
  });
  