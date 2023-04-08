import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';

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
			</Routes>
		</div>
	);
}

export default App;
