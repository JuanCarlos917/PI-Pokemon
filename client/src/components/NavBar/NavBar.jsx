import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar() {
	return (
		<div className={style.navBar}>
			<ul className={style.navBarList}>
				<li className={style.navBarItem}>
					<Link to='/home'>
						<button>Home</button>
					</Link>
				</li>
				<li className={style.navBarItem}>
					<Link to='/newpokemon'>
						<button>create new pokemon</button>
					</Link>
				</li>
			</ul>
			<div>
				<SearchBar />
			</div>
		</div>
	);
}
