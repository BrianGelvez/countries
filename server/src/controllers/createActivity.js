const { Activity, Country } = require('../db');

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    // Crear la actividad turística en la base de datos
    const activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Obtener los IDs de los países a partir de los nombres proporcionados
    const countryIds = [];
    for (const countryName of countries) {
      const country = await Country.findOne({ where: { name: countryName } });
      if (country) {
        countryIds.push(country.id);
      }
    }

    // Relacionar la actividad con los países correspondientes
    if (countryIds.length > 0) {
      await activity.setCountries(countryIds);
    }

    res.status(201).json({ message: 'Actividad turística creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la actividad turística', error);
    res.status(500).json({ message: 'Error al crear la actividad turística' });
  }
};


module.exports = createActivity;
