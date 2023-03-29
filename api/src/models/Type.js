const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'type',
		{
			name_type: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ timestamps: false },
	);
};