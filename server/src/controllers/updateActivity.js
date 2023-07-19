const {Activity} = require('../db')


const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { name, difficulty, duration, season } = req.body;

  try {
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Actualizar los campos de la actividad
    activity.name = name;
    activity.difficulty = difficulty;
    activity.duration = duration;
    activity.season = season;

    // Guardar los cambios en la base de datos
    await activity.save();

     res.status(200).json({ message: 'Activity updated successfully', activity });
  } catch (error) {
    console.error('Error updating activity:', error);
    return res.status(500).json({ message: 'Error updating activity' });
  }
};


module.exports = updateActivity