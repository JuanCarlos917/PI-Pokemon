import {
	GET_ALL_POKEMONS,
	GET_ALL_TYPES,
	GET_BY_ID,
	CLEAR_SORT,
	SEARCH_POKEMON,
	FILTER_POKEMONS_BY_TYPE,
	PAGINATION,
	PAGES,
	NEW_POKEMON,
	CHANGE_PAGE,
	SORT_POKEMONS_BY_ASC,
	SORT_POKEMONS_BY_DESC,
} from '../actions/actions-types';

const initialState = {
	pokemons: [],
	types: [],
	pokemonDetail: {},
	pokemonCreated: {},
	filteredPokemons: [],
	pagination: 12,
	pages: 0,
	page: 1,
	sortByAsc: false,
	sortByDesc: false,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
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
			};
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
				pagination: action.payload,
			};
		case PAGES:
			return {
				...state,
				pages: action.payload,
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
