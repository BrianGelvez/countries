const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const fetchCountriesFromApi = require('./src/controllers/fetchCountriesFromApi'); // Importa la función fetchCountriesFromApi

const PORT = 3001;


conn.sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);

      fetchCountriesFromApi()
        .then(() => {
          console.log('Países guardados en la base de datos');
        })
        .catch(error => console.error('Error al leer o procesar los datos de la API', error));
    });
  })
  .catch(error => console.error(error));
