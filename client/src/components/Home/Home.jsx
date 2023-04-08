import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import Pagination from '../Pagination/Pagination';
import style from './Home.module.css';

export default function Home() {
	const dispatch = useDispatch();
	const { pokemons } = useSelector((state) => state);

	useEffect(() => {
		dispatch(getAllPokemons());
	}, [dispatch]);

	return (
		<div className={style.card}>
			<div className={style.card_header}>
				<h1>Pokemons</h1>
				<h3>cant: {pokemons.length}</h3>
			</div>
			<div className={style.card_body}>
				{pokemons.map((pokemon) => (
					<div key={pokemon.id} className={style.pokemon}>
						<img src={pokemon.image} alt={pokemon.name} />
						<h3>{pokemon.name}</h3>
                        <h5>Attack {pokemon.attack}</h5>
                        <h5>Defense {pokemon.defense}</h5>
						<h4>Type:{pokemon.type1}</h4>
					</div>
				))}
			</div>
			<div className={style.card_footer}>
				<Pagination />
			</div>
		</div>
	);
}
