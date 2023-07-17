const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    duration: {
        type: DataTypes.STRING,
    },
    season: {
        type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
        allowNull: false,
      },
    }, {
      timestamps: false, // Excluir los campos 'createdAt' y 'updatedAt'
    });
  };
  
  
  
  
  