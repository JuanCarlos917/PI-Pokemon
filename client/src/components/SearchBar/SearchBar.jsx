import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPokemon } from '../../redux/actions';
import style from './SearchBar.module.css';

export default function SearchBar() {
	const [name, setName] = useState('');
	const [found, setFound] = useState(true);
	const [searching, setSearching] = useState(false); // estado para controlar si se está realizando una búsqueda
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const name = e.target.value;
		setName(name);
		if (name === '') {
			setFound(true);
		} else {
			// Se verifica si se está buscando actualmente antes de iniciar una nueva búsqueda
			if (!searching) {
				setSearching(true);
				dispatch(searchPokemon(name)).then((result) => {
					setSearching(false); // Se actualiza el estado cuando la búsqueda ha finalizado
					setFound(result !== undefined);
				});
			}
		}
	};

	const pokemonList = useSelector((state) => state.pokemons);
	const filteredList = pokemonList.filter(
		(pokemon) => pokemon.name.toLowerCase() === name.toLowerCase(),
	);
	const searchResults = filteredList.map((pokemon) => (
		<div key={pokemon.id} className={style.containerCard}>
			<h3 className={style.h3Card}>{pokemon.name}</h3>
			<p className={style.pCard}>attack {pokemon.attack}</p>
			<p className={style.pCard}>defense {pokemon.defense}</p>
			<img
				src={pokemon.image}
				alt={pokemon.name}
				className={style.imgCard}
			/>
		</div>
	));

	return (
		<div className={style.searchBar}>
			<input
                className={style.inputSearchBar}
				type='text'
				placeholder='Search a pokemon...'
				value={name}
				onChange={handleChange}
			/>
			{!found && <p>No existe ningún Pokémon con ese nombre.</p>}
			{found && searchResults.length > 0 && <div>{searchResults}</div>}
		</div>
	);
}
