import { useEffect, useRef, useState } from "react";
import { Button, Container, Divider, Header, Icon, Image, Transition } from "semantic-ui-react";
import '../styles/Home.css';

import fortniteLogo from '../images/fortnite.png';
import hungerGamesLogo from '../images/jogos-vorazes.png';
import squidGameLogo from '../images/round-6.png';
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";

const HomePage = (props) => {
    let nomeRef = useRef(null);
    
    let [placeholder, setPlaceholder] = useState('___');

    let [showBtn, setShowBtn] = useState(false);

    let [greetingsSegment, setGreetingsSegment] = useState(false);
    let [sorteioSegment, setSorteioSegment] = useState(false);

    let history = useHistory();
    

    useEffect(() => {

        let temNome = false;

        if(props.nome !== null)
            temNome = true;
        

        if(temNome) {
            props.setAppClass('home-bg');
            setGreetingsSegment(false);
            setSorteioSegment(true);
        } else {
            props.setAppClass('home-bg paused');
            setGreetingsSegment(true);
            setSorteioSegment(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clicaPlaceholder = () => {
        setPlaceholder('');

        setTimeout(() => {
            setShowBtn(true);
        }, 3000);
    }

    const keyPress = (event) => {
        if(event.charCode === 13) {
            nextStep();
            event.preventDefault();
        }
    }

    const nextStep = () => {
        setGreetingsSegment(false);
        props.setAppClass('home-bg');

        props.setNome(nomeRef.current.textContent);
        document.title = "Sorteio de " + nomeRef.current.textContent;
        sessionStorage.setItem('hostName', nomeRef.current.textContent);

        setTimeout(() => {
            setSorteioSegment(true);
        }, 1000);
    }

    const chooseGame = (game) => {

        setSorteioSegment(false);

        let rota = Rotas.hungerGames;

        switch (game) {
            case 1: // squid game
                rota = Rotas.squidGame;
                break;

            case 2: // fortnite
                rota = Rotas.fortnite;
                break;
        
            default: // hunger games
                rota = Rotas.hungerGames;
                break;
        }

        setTimeout(() => {
            history.push(rota);
        }, 1000);
    }

    const reset = () => {
        document.title = "Meu Sorteio";
        setSorteioSegment(false);
        setShowBtn(false);
        setPlaceholder('___');
        setTimeout(() => {
            setGreetingsSegment(true);
            props.setAppClass('home-bg paused');
        }, 1000);
    }

    return(
        <div>
            <Transition visible={sorteioSegment} animation='fade' duration={1000}>
                <Button className='corner-btn' circular basic inverted icon='redo' onClick={() => reset()} />
            </Transition>
            <Transition visible={greetingsSegment} animation='fade' duration={500}>
                <span className='span-grettings'>
                    <Header className='header-greetings' as='h1' inverted textAlign='center' >
                        Olá <span ref={nomeRef} class="input-greetings" onKeyPress={(e) => keyPress(e)} role="textbox" contentEditable onClick={() => clicaPlaceholder()} required>{placeholder}</span>!
                    </Header>
                    <Transition visible={showBtn} animation='fade' duration={500}>
                        <span className='span-grettings'>
                            <Button className='btn-grettings' inverted basic icon labelPosition='right' onClick={() => nextStep()} >Prosseguir <Icon name='arrow right' /> </Button>
                        </span>
                    </Transition>
                </span>
            </Transition>

            <Transition visible={sorteioSegment} animation='fade' duration={1000}>
                <span className='segment-grettings'>
                    <Header className='header-greetings' as='h1' inverted textAlign='center' >
                        Sorteio de {props.nome} 🎉
                    </Header>
                    <Container>
                        <Divider />
                            <br/>
                            <br/>
                            <br/>
                        <Header as='h1' inverted  >
                            Escolha um jogo:
                        </Header>
                        <Image className='image-game' src={hungerGamesLogo} size='medium' onClick={() => chooseGame(0)}/>
                        <Image className='image-game' src={squidGameLogo} size='medium' onClick={() => chooseGame(1)}/>
                        <Image className='image-game' src={fortniteLogo} size='medium' onClick={() => chooseGame(2)}/>
                    </Container>


                    
                </span>
            </Transition>
        </div>
    );

}

export default HomePage;