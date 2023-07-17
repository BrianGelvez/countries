const fs = require('fs');
const { Country } = require('../db'); // Asegúrate de importar el modelo correcto

const fetchCountriesFromApi = async () => {
  try {
    const data = fs.readFileSync('./api/db.json', 'utf8');
    const countriesData = JSON.parse(data).countries;
    // Iterar sobre los datos de los países
    for (const countryData of countriesData) {
      // Acceder a las propiedades necesarias con sus valores predeterminados
      const name = countryData.name?.common || '';

      const continent = countryData.continents?.[0] || '';
      const capital = countryData.capital?.[0] || '';
      const flagImage = countryData.flags?.png || '';
      const population = countryData.population || 0;

      // Crear un nuevo registro en la base de datos utilizando el modelo Country
      await Country.create({
        id: countryData.cca3,
        name: name,
        flagImage: flagImage,
        continent: continent,
        capital: capital,
        subregion: countryData.subregion,
        area: countryData.area,
        population: population,
      });
    }
  } catch (error) {
    console.error('Error al leer o procesar los datos de la API', error);
  }
}

module.exports = fetchCountriesFromApi;