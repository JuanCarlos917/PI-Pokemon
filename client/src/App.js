import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DetailPokemon from './components/DetailPokemon/DetailPokemon';
import FormNewPokemon from './components/FormNewPokemon/FormNewPokemon';

function App() {
  return (
		<div className='App'>
			<LandingPage />
			<Home />
			<DetailPokemon />
            <FormNewPokemon/>
		</div>
  );
}

export default App;
