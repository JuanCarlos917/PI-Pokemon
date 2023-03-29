const axios = require('axios');
const { Type } = require('../db');

const getAllTypesFromApi = async () => {
	const types = [];

	try {
		const response = await axios.get('https://pokeapi.co/api/v2/type');
		const results = response.data.results;

		for (let i = 0; i < results.length; i++) {
			types.push(results[i].name);
			await Type.findOrCreate({ where: { name_type: results[i].name } });
		}
	} catch (error) {
		console.log('Error fetching types from PokeAPI', error);
	}

	return types;
};

const getTypes = async (req, res) => {
	try {
		let types = await Type.findAll();

		if (types.length === 0) {
			types = await getAllTypesFromApi();
		}

		res.status(200).json(types);
	} catch (error) {
		res.status(400).json({
			error: 'Error connecting to API',
		});
	}
};

module.exports = {
	getTypes,
};
