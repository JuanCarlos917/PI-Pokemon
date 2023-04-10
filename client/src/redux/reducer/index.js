import {
	GET_ALL_POKEMONS,
	GET_ALL_TYPES,
	GET_BY_ID,
	CLEAR,
	SEARCH_POKEMON,
	FILTER_ORDER,
	PAGINATION,
	PAGES,
	NEW_POKEMON,
	CHANGE_PAGE,
} from '../actions/actions-types';

const initialState = {
    pokemons: [],
    types: [],
    pokemonDetail: {},
    pokemonCreated: {},
    order: '',
    pagination: 12,
    pages: 0,
    page: 1,
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
        case CLEAR:
            return {
                ...state,
                pokemonDetail: {},
            };
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemons: action.payload,
            };
        case FILTER_ORDER:
            return {
                ...state,
                order: action.payload,
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