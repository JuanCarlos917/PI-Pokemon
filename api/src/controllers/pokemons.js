const axios = require('axios');
const { PokemonType, Type, Pokemon } = require('../db');
//array contenedora de los pokemones
const allPokemons = [];
const cantPokemons = 10;

for (let index = 1; index < cantPokemons ; index++) {
	allPokemons.push(`https://pokeapi.co/api/v2/pokemon/${index}`);
}

const pokemons = [];
//Se obtiene los pokemons de la API y los almacena en un array
const getPokemons = async (req, res) => {
	// Se utiliza Promise.all para hacer todas las llamadas a la API al mismo tiempo
	await Promise.all(allPokemons.map((promise) => axios.get(promise)))
		.then((response) => {
			// Se recorre el array de respuestas y se almacena la información de cada pokemon en el array pokemons[]
			for (let i = 0; i < response.length; i++) {
				let data = response[i].data;
				pokemons.push({
					id: data.id,
					name: data.name,
					image: data.sprites.other.dream_world.front_default,
					hp: data.stats[0].base_stat,
					attack: data.stats[1].base_stat,
					defense: data.stats[2].base_stat,
					speed: data.stats[5].base_stat,
					height: data.height,
					weight: data.weight,
					type1: data.types[0].type.name,
				});
			}
		})
		.catch((err) => {
			res.status(400).json({
				error: 'error connecting to api',
			});
		});
};
const getPokemonsById = async (req, res) => {
	try {
		const { id } = req.params;
		//Si se recibe un id como parametro en la URL, se busca el pokemon en el array pokemons[] y se retorna
		if (id) {
			const idPokemon = pokemons.find((pokemon) => {
				return pokemon.id == id;
			});
			return res.status(200).json(idPokemon);
		}
	} catch {
		return res
			.status(400)
			.json({ error: 'The ID of the pokemon is required' });
	}
	//si el array de pokemos[] esta vacio, se retornan todos los pokemones
	if (pokemons.length > 0) res.status(200).json(pokemons);

	try {
		const dbPokemons = await Pokemon.findAll();
		// Si hay pokemons en la base de datos, se agregan al array pokemons[]
		pokemons = pokemons.concat(dbPokemons);
	} catch (error) {
		console.log('pokemon not found in DB');
	}
};

const searchPokemonByName = (req, res) => {
	try {
		const { name } = req.query;

		if (!name) {
			throw new Error('Name parameter is required');
		}

		// Se busca el pokemon con el nombre correspondiente en el array pokemons
		const queryPokemon = pokemons.filter((pokemon) => {
			return pokemon.name.toLowerCase().includes(name.toLowerCase());
		});
        console.log(queryPokemon);
		if (!queryPokemon.length) {
			throw new Error('There is no pokemon');
		}
		return res.status(200).json(queryPokemon);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};


const postPokemon = async (req, res) => {
	const { name, hp, attack, defense, speed, height, weight, image, type1 } =
		req.body;

	// Validar que el nombre del pokemon exista
	if (!name) {
		return res
			.status(400)
			.json({ error: 'The name of the pokemon is required' });
	}

	// Validar números enteros positivos
	const stats = [hp, attack, defense, speed];
	for (const stat of stats) {
		if (stat !== undefined && (!Number.isInteger(stat) || stat < 0)) {
			return res.status(400).json({
				error: 'must be positive integers',
			});
		}
	}
	// Validar que el nombre no se repita
	const repeatedPokemon = await Pokemon.findOne({ where: { name } });
	if (repeatedPokemon) {
		return res
			.status(409)
			.json({ error: 'Some pokemon already exist with that name' });
	}

	try {
		const newPokemon = await Pokemon.create({
			name,
			hp,
			attack,
			defense,
			speed,
			height,
			weight,
			image,
			type1,
		});
		// se agrega tipo a la db
		const typeAdd1 = await Type.findOne({
			where: {
				name_type: type1,
			},
		});
        await newPokemon.addType(typeAdd1, { through: PokemonType });

		return res.status(200).json(newPokemon);
	} catch (err) {
		console.error(err);
		return res.status(500).send('error when creating pokemon');
	}
};

module.exports = {
	getPokemons,
	postPokemon,
	searchPokemonByName,
	getPokemonsById,
};
