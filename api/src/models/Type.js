const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'type',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
			},
			nombre: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false },
	);
};
