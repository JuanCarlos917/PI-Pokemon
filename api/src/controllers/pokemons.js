const axios = require('axios');
const { PokemonType, Type, Pokemon } = require('../db');

let pokemons = [];
const allPokemons = [];
const cantPokemons = 60;

for (let index = 1; index <= cantPokemons; index++) {
	allPokemons.push(`https://pokeapi.co/api/v2/pokemon/${index}`);
}
//Se obtiene los pokemons de la API y los almacena en un array
const getPokemons = async (req, res) => {
	try {
		pokemons = [];

		await Promise.all(
			allPokemons.map((promise) => axios.get(promise)),
		).then((response) => {
			response.forEach(({ data }) => {
				pokemons.push({
					id: data.id,
					name: data.name,
					hp: data.stats[0].base_stat,
					attack: data.stats[1].base_stat,
					defense: data.stats[2].base_stat,
					speed: data.stats[5].base_stat,
					image: data.sprites.other.dream_world.front_default,
					type1: data.types[0].type.name,
					height: data.height,
					weight: data.weight,
				});
			});
		});

		const pokemonsDB = await Pokemon.findAll();
		pokemons = [...pokemons, ...pokemonsDB];

		const { name } = req.query;
		if (name) {
			const queryPokemon = pokemons.find((pokemon) => {
				return pokemon.name.toLowerCase() === name.toLowerCase();
			});
			if (!queryPokemon) throw new Error();
			return res.status(200).json(queryPokemon);
		}

		const { id } = req.params;
		if (id) {
			const pokemonByID = pokemons.find((pokemon) => {
				return pokemon.id == id;
			});
			return res.status(200).json(pokemonByID);
		}

		res.status(200).json(pokemons);
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			error: 'error connecting to api',
		});
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

module.exports = { getPokemons, postPokemon };
