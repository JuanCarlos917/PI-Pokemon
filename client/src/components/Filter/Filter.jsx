import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	filterPokemonsByType,
	filterPokemonsByAttackAsc,
    filterPokemonsByAttackDesc,
	getAllTypes,
	getAllPokemons,
	sortPokemonsByAsc,
	sortPokemonsByDesc,
	clearSort,
} from '../../redux/actions';
import style from './Filter.module.css';

export default function Filter() {
	const dispatch = useDispatch();
	const types = useSelector((state) => state.types);
	const filteredPokemons = useSelector((state) => state.filteredPokemons);
	const [selectedType, setSelectedType] = useState('all');

	useEffect(() => {
		dispatch(getAllTypes());
		dispatch(getAllPokemons());
	}, [dispatch]);

	useEffect(() => {
		dispatch(filterPokemonsByType(selectedType));
	}, [selectedType, dispatch]);

	const handleTypeChange = (e) => {
        e.preventDefault();
		const type = e.target.value;
		setSelectedType(type);
	};

	const handleSortAsc = (e) => {
        e.preventDefault();
		dispatch(sortPokemonsByAsc());
	};

	const handleSortDesc = (e) => {
        e.preventDefault();
		dispatch(sortPokemonsByDesc());
	};

	const handleClearSort = (e) => {
        e.preventDefault();
		setSelectedType('all');
		dispatch(clearSort());
		dispatch(filterPokemonsByType('all'));
		dispatch(getAllPokemons());
	};

	// Función para ordenar los pokémones por ataque
	const handlePokemonsByAttackAsc = (e) => {
        e.preventDefault();
		dispatch(filterPokemonsByAttackAsc());
	};
    const handlePokemonsByAttackDesc = (e) => {
		e.preventDefault();
		dispatch(filterPokemonsByAttackDesc());
	};

	return (
		<div>
			<h2 className={style.sub__title__filter}>Filter</h2>
			<select value={selectedType} onChange={handleTypeChange}>
				<option value='all'>All</option>
				{types.map((type) => (
					<option key={type.id} value={type.name}>
						{type.name_type}
					</option>
				))}
			</select>
			<div className={style.div__button__filter}>
				<button
					className={style.button__filter}
					onClick={handleSortAsc}>
					Sort A-Z
				</button>
				<button
					className={style.button__filter}
					onClick={handleSortDesc}>
					Sort Z-A
				</button>
				<button
					className={style.button__filter}
					onClick={handleClearSort}>
					Clear Sort
				</button>
				<button
					className={style.button__filter}
					onClick={handlePokemonsByAttackAsc}>
					Attack Asc
				</button>
				<button
					className={style.button__filter}
					onClick={handlePokemonsByAttackDesc}>
					Attack Desc
				</button>
			</div>
			<h3>Pokemons:</h3>
			<div className={style.card}>
				<div className={style.card_body}>
					{filteredPokemons.map((pokemon) => (
						<div key={pokemon.id} className={style.pokemon}>
							<img src={pokemon.image} alt={pokemon.name} />
							<h3>{pokemon.name}</h3>
							<h5>Attack {pokemon.attack}</h5>
							<h5>Defense {pokemon.defense}</h5>
							<h4>Type:{pokemon.type1}</h4>
							<Link to={`/detail/${pokemon.id}`}>
								<button className={style.buttonHome}>
									See more
								</button>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
