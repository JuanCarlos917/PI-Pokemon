import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';
import style from './Home.module.css';
import Card from '../Card/Card';

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
			<div>
				<Filter />
			</div>
			<div>
				<Card />
			</div>
			<div className={style.card_footer}>
				<Pagination />
			</div>
		</div>
	);
}
