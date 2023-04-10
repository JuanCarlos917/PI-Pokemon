import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, postNewPokemon } from '../../redux/actions/index';
import style from './FormNewPokemon.module.css';

export default function FormNewPokemon() {
	const isValidName = (name) => {
		return /^[a-zA-Z]+$/.test(name);
	};

	const isValidAttribute = (attribute) => {
		return /^\d{1,3}$/.test(attribute) && attribute <= 1000;
	};
	const dispatch = useDispatch();
	const types = useSelector((state) => state.types);
	const [name, setName] = useState('');
	const [hp, setHp] = useState(null);
	const [attack, setAttack] = useState(null);
	const [defense, setDefense] = useState(null);
	const [speed, setSpeed] = useState(null);
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);
	const [image, setImage] = useState('');
	const [type1, setType1] = useState('');

	useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const handleChangeType = (event) => {
		setType1(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			isValidName(name) &&
			isValidAttribute(hp) &&
			isValidAttribute(attack) &&
			isValidAttribute(defense) &&
			isValidAttribute(speed) &&
			isValidAttribute(height) &&
			isValidAttribute(weight)
		) {
			try {
				const payload = {
					name,
					hp,
					attack,
					defense,
					speed,
					height,
					weight,
					image,
					type1,
				};
				await dispatch(postNewPokemon(payload));
				// Limpiar el formulario después de enviarlo
				setName('');
				setHp('');
				setAttack('');
				setDefense('');
				setSpeed('');
				setHeight('');
				setWeight('');
				setImage('');
				setType1('');
				// Actualizar lista de pokemons después de agregar uno nuevo
			} catch (error) {
				console.error(error);
			}
		} else {
			alert('Please enter valid values for all fields.');
		}
	};

	const handleChange = (event) => {
		event.preventDefault();
		if (event.target.id === 'name') {
			setName(event.target.value);
		} else if (event.target.id === 'hp') {
			setHp(Number(event.target.value));
		} else if (event.target.id === 'attack') {
			setAttack(Number(event.target.value));
		} else if (event.target.id === 'defense') {
			setDefense(Number(event.target.value));
		} else if (event.target.id === 'speed') {
			setSpeed(Number(event.target.value));
		} else if (event.target.id === 'height') {
			setHeight(Number(event.target.value));
		} else if (event.target.id === 'weight') {
			setWeight(Number(event.target.value));
		} else if (event.target.id === 'image' && event.target.value !== '') {
			setImage(event.target.value);
		}
	};
	return (
		<div>
        <div>
            <h1 className={style.title__form}>Create Your Pokemon</h1>
        </div>
			<form onSubmit={handleSubmit} className={style.formNewPokemon}>
				<section>
					<label htmlFor='name'>Name:</label>
					<input
						id='name'
						type='text'
						value={name}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor='hp'>HP:</label>
					<input
						id='hp'
						type='number'
						value={hp}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor='attack'>Attack:</label>
					<input
						id='attack'
						type='number'
						value={attack}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor='defense'>Defense:</label>
					<input
						id='defense'
						type='number'
						value={defense}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor='speed'>Speed:</label>
					<input
						id='speed'
						type='number'
						value={speed}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor='height'>Height:</label>
					<input
						id='height'
						type='number'
						value={height}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor='weight'>Weight:</label>
					<input
						id='weight'
						type='number'
						value={weight}
						onChange={handleChange}
					/>
				</section>
				<section>
					<label htmlFor='image'>Image URL:</label>
					<input
						id='image'
						type='text'
						value={image}
						onChange={handleChange}
					/>
				</section>
				<section>
					<select
						name='type1'
						id='type1'
						value={type1}
						onChange={(e) => handleChangeType(e)}
						required>
						<option value=''>Select a type</option>
						{types.map((type) => (
							<option key={type.id} value={type.name}>
								{type.name_type}
							</option>
						))}
					</select>
				</section>
				<div>
                    <Link to='/home'>
					<button >
						Back to home
					</button>
                    </Link>
					<button type='submit' className={style.buttonForm}>
						Add Pokemon
					</button>
				</div>
			</form>
		</div>
	);
}
