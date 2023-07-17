const { Op } = require('sequelize');
const { Country } = require('../db');

const getCountriesByName = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  
  try {
    // Busca los países que coinciden con el nombre recibido por query
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Utilizamos Op.iLike para hacer una búsqueda que no distinga entre mayúsculas y minúsculas
        },
      },
    });

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No se encontraron países' });
    }

    res.json(countries);
  } catch (error) {
    console.error('Error al obtener los países por nombre', error);
    res.status(500).json({ message: 'Error al obtener los países' });
  }
};

module.exports = getCountriesByName;
