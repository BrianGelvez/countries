const { Country } = require('../db');
const fs = require('fs');
const fetchCountriesFromApi = require('../controllers/fetchCountriesFromApi');

describe('fetchCountriesFromApi', () => {
    it("test_read_file_success",async () => {
        const mockData = JSON.stringify({ countries: [] });
        jest.spyOn(fs, 'readFileSync').mockReturnValue(mockData);
        
        jest.spyOn(Country, 'create').mockResolvedValue();
      
        const result = await fetchCountriesFromApi();
  
   
        expect(fs.readFileSync).toHaveBeenCalledWith('./api/db.json', 'utf8');
  
        
        expect(Country.create).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
      })
});
