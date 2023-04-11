import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';

import style from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card() {
	const dispatch = useDispatch();
	const { pokemons } = useSelector((state) => state);

	useEffect(() => {
		dispatch(getAllPokemons());
	}, [dispatch]);

	return (
		<div className={style.card}>
			<div className={style.card_body}>
				{pokemons.map((pokemon) => (
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

	);
}
