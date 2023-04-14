import {
	GET_ALL_POKEMONS,
	GET_ALL_TYPES,
	GET_BY_ID,
	CLEAR_SORT,
	SEARCH_POKEMON,
	FILTER_POKEMONS_BY_TYPE,
	PAGINATION,
	NEW_POKEMON,
	CHANGE_PAGE,
	SORT_POKEMONS_BY_ASC,
	SORT_POKEMONS_BY_DESC,
	SORT_POKEMONS_BY_ATTACK_ASC,
	SORT_POKEMONS_BY_ATTACK_DESC,
} from '../actions/actions-types';

const initialState = {
	pokemons: [],
	types: [],
	pokemonDetail: {},
	pokemonCreated: {},
	filteredPokemons: [],
	pokemosPage: [],
	page: '',
	sortByAsc: false,
	sortByDesc: false,
	sortByAttack: false,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
				pokemosPage: action.payload,
			};
		case GET_ALL_TYPES:
			return {
				...state,
				types: action.payload,
			};
		case GET_BY_ID:
			return {
				...state,
				pokemonDetail: action.payload,
			};
		case CLEAR_SORT:
			return {
				...state,
				sortByAsc: false,
				sortByDesc: false,
			};
		case SEARCH_POKEMON:
			return {
				...state,
				pokemons: action.payload,
				pokemosPage: [action.payload],
			};
		case SORT_POKEMONS_BY_ATTACK_ASC: {
			const sortedPokemons = [...state.pokemons].sort((a, b) => {
				return a.attack - b.attack;
			});

			return {
				...state,
				filteredPokemons: sortedPokemons,
			};
		}
		case SORT_POKEMONS_BY_ATTACK_DESC: {
			const sortedPokemons = [...state.pokemons].sort((a, b) => {
				return b.attack - a.attack;
			});

			return {
				...state,
				filteredPokemons: sortedPokemons,
			};
		}
		case FILTER_POKEMONS_BY_TYPE:
			const filteredPokemons = state.pokemons.filter(
				(pokemon) => pokemon.type1 === action.payload,
			);
			return {
				...state,
				filteredPokemons,
			};
		case SORT_POKEMONS_BY_ASC:
			const sortedPokemonsAsc = [...state.pokemons].sort((a, b) =>
				a.name.localeCompare(b.name),
			);
			return {
				...state,
				pokemons: sortedPokemonsAsc,
				sortByAsc: true,
				sortByDesc: false,
			};
		case SORT_POKEMONS_BY_DESC:
			const sortedPokemonsDesc = [...state.pokemons].sort((a, b) =>
				b.name.localeCompare(a.name),
			);
			return {
				...state,
				pokemons: sortedPokemonsDesc,
				sortByAsc: false,
				sortByDesc: true,
			};

		case PAGINATION:
			return {
				...state,
				pokemosPage: action.payload,
			};
		case NEW_POKEMON:
			return {
				...state,
				pokemonCreated: action.payload,
			};
		case CHANGE_PAGE:
			return {
				...state,
				page: action.payload,
			};
		default:
			return state;
	}
}

export default rootReducer;
