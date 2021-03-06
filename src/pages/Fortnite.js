import React, { useEffect, useState } from "react";
import { Button, Container, Header, Icon, Image, Transition } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import '../styles/HungerGames.css';

import hgIntro from '../images/fortnite.jpg';
import fortniteLogo from '../images/fortnite.png';
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";

const FortnitePage = (props) => {

    let history = useHistory();
    
    let [showIntro, setShowIntro] = useState(false);
    let [showPlayerSegment, setShowPlayerSegment] = useState(false);
    let [showPresentationName, setShowPresentationName] = useState(false);
    let [showPresentationGame, setShowPresentationGame] = useState(false);

    useEffect(() => {
        props.setAppClass('fortnite-bg');
        setShowIntro(true);

        setTimeout(() => {
            setShowIntro(false);
            setShowPlayerSegment(true);
        }, 3000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const homePage = () => {
        history.push(Rotas.base);
    }

    let startPresentation = () => {
        setShowPlayerSegment(false);
        setTimeout(() => {
            props.setAppClass('black-presentation-bg');
            setShowPresentationName(true);
            setTimeout(() => {
                setShowPresentationName(false);
                setTimeout(() => {
                    setShowPresentationGame(true);
                    props.setAppClass('fn-presentation-bg');
                }, 1000);
            }, 1500);
        }, 1000);
    }

    return(<>
            
            <Transition visible={showIntro} animation='fade up' duration={1000}>
                <div className='hg-intro' style={{backgroundImage: 'url(' + hgIntro +')'}}>
                    <Header as='h2' className='loading-bottom' inverted>
                        <Icon name='circle notch' loading size='big' color='white' />
                        <Header.Content>Carregando</Header.Content>
                    </Header>
                </div>
            </Transition>
            <Transition visible={showPlayerSegment} animation='fade up' duration={1000}>
                <div>
                    <Button className='corner-btn' circular basic inverted icon='home' onClick={() => homePage()} />
                    <Container>
                        <br/>
                        <br/>
                        <Image src={fortniteLogo} size='medium' centered/>
                        <Header as='h1' inverted textAlign='center' >
                            Por: <b>{props.nome}</b>
                        </Header>
                        <PlayersForm game={1} emojis={props.emojis} playerNames={props.playerNames} setPlayerNames={props.setPlayerNames} startPresentation={startPresentation} />
                        <br/>
                    </Container>
                </div>
            </Transition>
            <Transition visible={showPresentationName} animation='fade' duration={1000}>
                <div style={{width: '100%', height: '100vh'}}>
                    <span className='span-grettings'>
                        <Header className='header-greetings' as='h1' inverted textAlign='center' >
                            <b style={{textTransform: 'uppercase'}}>{props.nome}</b>
                            <Header.Subheader>
                                Apresenta:
                            </Header.Subheader>
                        </Header>
                    </span>
                </div>
            </Transition>
            <Transition visible={showPresentationGame} animation='zoom' duration={3000}>
                <div style={{width: '100%', height: '100vh'}}>
                    <span className='span-grettings'>
                        <Image src={fortniteLogo} size='huge' centered/>
                    </span>
                </div>
            </Transition>
        </>
    );
}

export default FortnitePage;