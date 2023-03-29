const { Router } = require('express');
const router = Router();
const { getPokemons, postPokemon } = require('../controllers/pokemons');
const { getTypes } = require('../controllers/types');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons)
router.get('/pokemons/:id', getPokemons);
router.get('/pokemons/name?=', getPokemons);
router.post('/pokemons', postPokemon);
router.get('/types', getTypes);
module.exports = router;
