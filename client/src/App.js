import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import DetailPokemon from './components/DetailPokemon/DetailPokemon';
import FormNewPokemon from './components/FormNewPokemon/FormNewPokemon';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route
					path='/home'
					element={
						<>
							<NavBar />
							<Home />
						</>
					}
				/>
				<Route path='/detail/:id' element={<DetailPokemon />} />
				<Route path='/newpokemon' element={<FormNewPokemon />} />
			</Routes>
		</div>
	);
}

export default App;
