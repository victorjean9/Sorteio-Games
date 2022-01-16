import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Rotas from './components/Rotas';
import BBBPage from './pages/BBB';
import FortnitePage from './pages/Fortnite';
import HomePage from './pages/Home';
import HungerGamesPage from './pages/HungerGames';
import SquidGamePage from './pages/SquidGame';
import './styles/App.css';

const App = () => {

	let [nome, setNome] = useState(null);
    let [appClass, setAppClass] = useState('home-bg paused');

	let [playerNames, setPlayerNames] = useState({ val: [], emojis: []});

	useEffect(() => {
		if(sessionStorage.getItem('hostName') !== null)
			setNome(sessionStorage.getItem('hostName'));

		if(sessionStorage.getItem('playersList') !== null)
			setPlayerNames(JSON.parse(sessionStorage.getItem('playersList')));
	}, []);

	const renderHomePage = () => {
		return(
			<HomePage nome={nome} setNome={setNome} setAppClass={setAppClass}/>
		)
	}

	const renderHungerGamesPage = () => {
		return(
			<HungerGamesPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} />
		)
	}

	const renderBBBPage = () => {
		return(
			<BBBPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} />
		)
	}

	const renderSquidGamePage = () => {
		return(
			<SquidGamePage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} />
		)
	}

	const renderFortnitePage = () => {
		return(
			<FortnitePage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} />
		)
	}

	
	return (
		<div className={appClass}>
			<Router>
				<Switch>
					<Route path={Rotas.base} exact render={() => renderHomePage()}/>
					
					<Route path={Rotas.hungerGames} exact render={() => renderHungerGamesPage()}/>
					<Route path={Rotas.bbb} exact render={() => renderBBBPage()}/>
					<Route path={Rotas.squidGame} exact render={() => renderSquidGamePage()}/>
					<Route path={Rotas.fortnite} exact render={() => renderFortnitePage()}/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
