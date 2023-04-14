import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, pagination } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import style from './Home.module.css';

export default function Home() {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsPerPage] = useState(12);

	const pokemons = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(getAllPokemons());
	});

	const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
	const handleClick = (page) => {
		setCurrentPage(page);
		dispatch(pagination(page));
	};

	// Calcular el rango de índices de los pokemons que se muestran en la página actual
	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = pokemons.slice(
		indexOfFirstPokemon,
		indexOfLastPokemon,
	);

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					className={currentPage === i ? 'active' : ''}
					onClick={() => handleClick(i)}>
					{i}
				</button>,
			);
		}
		return pageNumbers;
	};

	return (
		<div className={style.card}>
			<div className={style.card_header}>
				<h1>Pokemons</h1>
				<h3>cant: {pokemons.length}</h3>
			</div>
			<div className='pagination'>{renderPageNumbers()}</div>
			<div>
				<Filter />
			</div>
			<div className={style.card}>
				<div className={style.card_body}>
					{currentPokemons.map((pokemon) => (
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
			<div className={style.card_footer}>
				<div className='pagination'>{renderPageNumbers()}</div>
			</div>
		</div>
	);
}
