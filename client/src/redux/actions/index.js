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
} from './actions-types';
import axios from 'axios';

const BACKEND = "http://localhost:3001"

export function getAllPokemons() {
    return async function (dispatch) {
        const response = await axios.get(`${BACKEND}/pokemons/`);
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: response.data,
        });
    };
}

export function getAllTypes() {
    return async function (dispatch) {
        const response = await axios.get(`${BACKEND}/types`);
        return dispatch({
            type: GET_ALL_TYPES,
            payload: response.data,
        });
    };
}

export function getById(id) {
    return async function (dispatch) {
        const response = await axios.get(`${BACKEND}/pokemons/${id}`);
        return dispatch({
            type: GET_BY_ID,
            payload: response.data,
        });
    };
}

export function clear() {
    return {
        type: CLEAR,
    };
}

export function searchPokemon(name) {
    return {
        type: SEARCH_POKEMON,
        payload: name,
    };
}

export function filterOrder(order) {
    return {
        type: FILTER_ORDER,
        payload: order,
    };
}

export function pagination(page) {
    return {
        type: PAGINATION,
        payload: page,
    };
}

export function pages(page) {
    return {
        type: PAGES,
        payload: page,
    };
}

export function newPokemon(payload) {
    return async function (dispatch) {
        const response = await axios.post(`${BACKEND}/pokemons`, payload);
        return dispatch({
            type: NEW_POKEMON,
            payload: response.data,
        });
    };
}

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
}







