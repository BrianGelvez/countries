// controllers/deleteActivity.js
const { Activity } = require('../db');

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica si la actividad existe en la base de datos
    const existingActivity = await Activity.findByPk(id);

    if (!existingActivity) {
      return res.status(404).json({ error: 'La actividad no fue encontrada' });
    }

    // Elimina la actividad de la base de datos
    await existingActivity.destroy();

    // Responde con un mensaje de éxito y el código de estado 200 (éxito)
    res.status(200).json({ message: 'Actividad eliminada correctamente' });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al eliminar la actividad' });
  }
};

module.exports = deleteActivity;
