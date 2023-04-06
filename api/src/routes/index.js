const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemons, postPokemon } = require('../controllers/pokemons');
const { getTypes } = require('../controllers/types');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemons);
router.get('/types', getTypes);
router.post('/pokemons', postPokemon);
module.exports = router;
