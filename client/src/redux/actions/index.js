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
	SORT_POKEMONS_BY_DESC,
	SORT_POKEMONS_BY_ASC,
	SORT_POKEMONS_BY_ATTACK,
} from './actions-types';
import axios from 'axios';

const BACKEND = 'http://localhost:3001';

export function getAllPokemons() {
	return async function (dispatch) {
		const response = await axios.get(`${BACKEND}/pokemons`);
		console.log(response);
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
		console.log(response);
		return dispatch({
			type: GET_BY_ID,
			payload: response.data,
		});
	};
}

export function searchPokemon(name) {
	return async function (dispatch) {
		const response = await axios.get(`${BACKEND}/pokemons?name=${name}`);
		console.log(response);
		return dispatch({
			type: SEARCH_POKEMON,
			payload: response.data,
		});
	};
}

export function postNewPokemon(payload) {
	return async function (dispatch) {
		try {
			const response = await axios.post(`${BACKEND}/pokemons`, payload);
			console.log(response);
			dispatch({
				type: NEW_POKEMON,
				payload: response.data,
			});
			alert('Pokemon created successfully');
			return response.data;
		} catch (error) {
			console.log(error);
			alert('Error creating Pokemon');
			throw error;
		}
	};
}

export const sortPokemonsByAsc = () => ({
	type: SORT_POKEMONS_BY_ASC,
});

export const sortPokemonsByDesc = () => ({
	type: SORT_POKEMONS_BY_DESC,
});

export const clearSort = () => ({
	type: CLEAR_SORT,
});

export function filterPokemonsByType(type) {
	return {
		type: FILTER_POKEMONS_BY_TYPE,
		payload: type,
	};
}
export function filterPokemonsByAttack() {
	return {
		type: SORT_POKEMONS_BY_ATTACK,
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

export function changePage(page) {
	return {
		type: CHANGE_PAGE,
		payload: page,
	};
}
