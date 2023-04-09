import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getById } from '../../redux/actions';
import style from './DetailPokemon.module.css';

export default function DetailPokemon() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const pokemonDetail = useSelector((state) => state.pokemonDetail);

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id]);

    return (
        <div className={style.detail}>
            <div className={style.detail__container}>
                <div className={style.detail__container__img}>
                    <img src={pokemonDetail.image} alt={pokemonDetail.name} />
                </div>
                <div className={style.detail__container__info}>
                    <h2>{pokemonDetail.name}</h2>
                    <div className={style.detail__container__info_stats}>
                        <p>ID: {pokemonDetail.id}</p>
                        <p>HP: {pokemonDetail.hp}</p>
                        <p>Attack: {pokemonDetail.attack}</p>
                        <p>Defense: {pokemonDetail.defense}</p>
                        <p>Speed: {pokemonDetail.speed}</p>
                        <p>Height: {pokemonDetail.height}</p>
                        <p>Weight: {pokemonDetail.weight}</p>
                        <p>Type: {pokemonDetail.type1}</p>

                    </div>
                </div>
            </div>
        </div>
    );
}