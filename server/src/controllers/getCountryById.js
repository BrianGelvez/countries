const { Country, Activity } = require('../db');

const getCountryById = async (req, res) => {
    const { id } = req.params;
    console.log('ID del país:', id);
  
    try {
      // Busca el país por su ID en la base de datos
      const country = await Country.findOne({
        where: {
          id: id,
        },
        include: {
          model: Activity,
          attributes: ['name', 'difficulty', 'duration', 'season'], // Asegúrate de incluir los atributos necesarios
        },
      });
  
      if (!country) {
        return res.status(404).json({ message: 'País no encontrado' });
      }
      
  
      // Devuelve el país con las actividades turísticas asociadas
      res.json(country);
    } catch (error) {
      console.error('Error al obtener el país:', error);
      res.status(500).json({ message: 'Error al obtener el país' });
    }
};
  
module.exports = getCountryById;
