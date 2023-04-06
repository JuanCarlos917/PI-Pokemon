import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import { useEffect, useState } from 'react';

export default function Home() {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    return (
        <div className="home">
            <div className="home__container">
            <h1>Hola</h1>
                <div className="home__container__cards">
                    {currentPokemons.map((pokemon) => (
                        <div className="home__container__cards__card" key={pokemon.id}>
                            <Link to={`/pokemons/${pokemon.id}`}>
                                <img
                                    className="home__container__cards__card__img"
                                    src={pokemon.img}
                                    alt={pokemon.name}
                                />
                                <h3 className="home__container__cards__card__name">
                                    {pokemon.name}
                                </h3>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="home__container__pagination">
                    <ul className="home__container__pagination__list">
                        {pageNumbers.map((number) => (
                            <li
                                className="home__container__pagination__list__item"
                                key={number}
                            >
                                <button
                                    className="home__container__pagination__list__item__button"
                                    onClick={() => setCurrentPage(number)}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


