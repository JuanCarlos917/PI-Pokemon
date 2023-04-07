import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import './Home.module.css';

export default function Home() {
	const dispatch = useDispatch();
	const { pokemons } = useSelector((state) => state);


	useEffect(() => {
		dispatch(getAllPokemons());
	}, [dispatch]);

	return (
		<div>
			<SearchBar />
			<h1>Pokemons</h1>
			<div>
				{pokemons.map((pokemon) => (
					<div key={pokemon.id}>
						<h3>{pokemon.name}</h3>
						<img src={pokemon.image} alt={pokemon.name} />
						<h4>Type:{pokemon.type1}</h4>
					</div>
				))}
			</div>
			<div>
				<Pagination />
			</div>
		</div>
	);
}
