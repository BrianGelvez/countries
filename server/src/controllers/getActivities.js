const { Activity, Country } = require('../db');

const getActivities = async (req, res) => {
  try {
    // Obtener todas las actividades turísticas de la base de datos
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          attributes: ['name'],
        },
      ],
    });
    
    const transformedActivities = activities.map(activity => {
      const countryNames = activity.Countries.map(country => country.name);
      return {
        ...activity.toJSON(),
        Countries: countryNames,
      };
    });
    
    res.json(transformedActivities);
  } catch (error) {
    console.error('Error al obtener las actividades turísticas', error);
    res.status(500).json({ message: 'Error al obtener las actividades turísticas' });
  }
};

module.exports = getActivities;
