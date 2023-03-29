const axios = require('axios');
const { Pokemon } = require('../db');
const { Type } = require('../db');
const { PokemonType } = require('../db');

const allPokemons = [];

for (let index = 1; index < 10; index++) {
	allPokemons.push(`https://pokeapi.co/api/v2/pokemon/${index}`);
}
console.log(allPokemons);
const getPokemons = async (req, res) => {
	let pokemons = [];
    console.log(pokemons);

	await Promise.all(allPokemons.map((promise) => axios.get(promise)))
		.then((response) => {
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
				});
			}
		})
		.catch((err) => {
			res.status(400).json({
				error: 'error connecting to api',
			});
		});

	try {
		const { id } = req.params;

		if (id) {
			const idPokemon = pokemons.find((pokemon) => {
				return pokemon.id == id;
			});

			return res.status(200).json(idPokemon);
		}
	} catch {
		console.log('Pokemon id required');
	}
	if (pokemons.length > 0) res.status(200).json(pokemons);

	try {
		const dbPokemons = await Pokemon.findAll();

		pokemons = pokemons.concat(dbPokemons);
	} catch (error) {
		console.log('pokemon not found in DB');
	}

	try {
		const { name } = req.query;

		if (!name) {
			throw new Error('Name parameter is required');
		}

		const queryPokemon = pokemons.find((pokemon) => {
			return pokemon.name.toLowerCase() === name.toLowerCase();
		});

		if (!queryPokemon) {
			throw new Error('There is no pokemon');
		}

		return res.status(200).json(queryPokemon);
	} catch (err) {
		return res.status(400).send(err.message);
	}
};

const postPokemon = async (req, res) => {
	const { name, hp, attack, defense, speed, height, weight, image } =
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
		});

		return res.status(200).json(newPokemon);
	} catch (err) {
		console.error(err);
		return res.status(500).send('error when creating pokemon');
	}
};



module.exports = {getPokemons, postPokemon}

