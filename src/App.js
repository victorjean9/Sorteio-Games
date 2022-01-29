import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Rotas from './components/Rotas';
import BBBPage from './pages/BBB';
import ChiquinhaPage from './pages/Chiquinha';
import FortnitePage from './pages/Fortnite';
import HomePage from './pages/Home';
import HungerGamesPage from './pages/HungerGames';
import SquidGamePage from './pages/SquidGame';
import TestPage from './pages/Test';
import './styles/App.css';

const App = () => {

	const importAll = (r) => {
        let images = [];
        r.keys().forEach((item) => { 
            images.push(r(item).default);
        });
        return images;
    }

    const emojis = importAll(require.context('./images/emojis', false, /\.(png|jpe?g|svg)$/));

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
			<HungerGamesPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis}/>
		)
	}

	const renderBBBPage = () => {
		return(
			<BBBPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis}/>
		)
	}

	const renderSquidGamePage = () => {
		return(
			<SquidGamePage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis}/>
		)
	}

	const renderFortnitePage = () => {
		return(
			<FortnitePage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis}/>
		)
	}

	const renderChiquinhaPage = () => {
		return(
			<ChiquinhaPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis}/>
		)
	}

	const renderTestPage = () => {
		return(
			<TestPage />
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
					<Route path={Rotas.chiquinha} exact render={() => renderChiquinhaPage()}/>

					<Route path={Rotas.test} exact render={() => renderTestPage()}/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
