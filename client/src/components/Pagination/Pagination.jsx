import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, pagination } from '../../redux/actions/index';

const Pagination = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsPerPage] = useState(24);

	const pokemons = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(getAllPokemons());
	}, [dispatch]);

	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = pokemons.slice(
		indexOfFirstPokemon,
		indexOfLastPokemon,
	);

	const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

	const handleClick = (page) => {
		setCurrentPage(page);
		dispatch(pagination(page));
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<li
					key={i}
					className={currentPage === i ? 'active' : ''}
					onClick={() => handleClick(i)}>
					{i}
				</li>,
			);
		}

		return pageNumbers;
	};

	return (
		<div>
        <h1>Pagination</h1>
			<ul>
				{currentPokemons.map((pokemon) => (
					<li key={pokemon.id}>{pokemon.name}</li>
				))}
			</ul>
			<ul className='pagination'>{renderPageNumbers()}</ul>
		</div>
	);
};

export default Pagination;
