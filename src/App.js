import axios from 'axios';
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
import './styles/fonts.css';

const App = () => {

	const importAll = (r) => {
        let images = [];
        r.keys().forEach((item) => { 
            images.push(r(item));
        });
        return images;
    }

    const emojis = importAll(require.context('./images/emojis', false, /\.(png|jpe?g|svg)$/));
	let [outfits, setOutfits] = useState([]);

	let [nome, setNome] = useState(null);
    let [appClass, setAppClass] = useState('home-bg paused');

	let [playerNames, setPlayerNames] = useState({ val: [], emojis: [], fortniteOutfit: []});
	

	useEffect(() => {
		carregaOutfits();

		if(sessionStorage.getItem('hostName') !== null)
			setNome(sessionStorage.getItem('hostName'));

		if(sessionStorage.getItem('playersList') !== null)
			setPlayerNames(JSON.parse(sessionStorage.getItem('playersList')));
	}, []);

    const carregaOutfits = () => {
        axios.get("https://fortnite-api.com/v2/cosmetics/br/search/all", {
            params: {
                type: "outfit", 
                language: "pt-BR",
                searchLanguage: "pt-BR",
                hasFeaturedImage: "true",
            }
        })
        .then((response) => {
            let resultados = response.data.data;

            let fotosOutfits = [];
            resultados.forEach(outfit => {
                fotosOutfits.push(outfit.images.smallIcon);
            });

            setOutfits(fotosOutfits);
        })
        .catch(() => {
            setOutfits([]);
        })
    }

	const renderHomePage = () => {
		return(
			<HomePage nome={nome} setNome={setNome} setAppClass={setAppClass}/>
		)
	}

	const renderHungerGamesPage = () => {
		return(
			<HungerGamesPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis} fortniteOutfits={outfits}/>
		)
	}

	const renderBBBPage = () => {
		return(
			<BBBPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis} fortniteOutfits={outfits}/>
		)
	}

	const renderSquidGamePage = () => {
		return(
			<SquidGamePage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis} fortniteOutfits={outfits}/>
		)
	}

	const renderFortnitePage = () => {
		return(
			<FortnitePage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis} fortniteOutfits={outfits}/>
		)
	}

	const renderChiquinhaPage = () => {
		return(
			<ChiquinhaPage nome={nome} setAppClass={setAppClass} playerNames={playerNames} setPlayerNames={setPlayerNames} emojis={emojis} fortniteOutfits={outfits}/>
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
