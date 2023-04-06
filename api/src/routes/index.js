const { Router } = require('express');
const router = Router();
const {
	getPokemons,
	postPokemon,
	searchPokemonByName,
	getPokemonsById,
} = require('../controllers/pokemons');
const { getTypes } = require('../controllers/types');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons/', getPokemons)
router.get('/pokemons', searchPokemonByName);
router.get('/pokemons/:id', getPokemonsById);
router.post('/pokemons', postPokemon);
router.get('/types', getTypes);
module.exports = router;
