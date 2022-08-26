import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Grid, Header, Icon, Image, Transition } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import '../styles/HungerGames.css';

import hgIntro from '../images/fortnite/fortintro.png';
import fortniteLogo from '../images/fortnite.png';
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";
import axios from "axios";
import ModalInfo from "../components/ModalInfo";
import { useMediaQuery } from "react-responsive";

import fortBack from "../images/fortnite/spiked.jpg";
import prosseguirBtnImg from "../images/fortnite/prosseguir_btn.jpg";
import voltarBtnImg from "../images/fortnite/voltar_btn.jpg";

const GroupListPresentiton = (props) => (
    <Transition visible={props.visible} animation='fade' duration={1000}>
        <Container>
            <br/>
            <br/>
            <Grid>
                <Grid.Column>
                    <Header as='h1' inverted textAlign='center' icon className='fortnite-font fort-header fort-header'> 
                        <Header.Content>O ÔNIBUS DE BATALHA IRÁ PARTIR EM INSTANTES</Header.Content>
                    </Header>
                    <Divider/>
                </Grid.Column>
            </Grid>
            <Grid columns={props.isSmall ? 3 : 6} centered>
                {   
                    props.players.val.map(
                        (item, index) => (
                            <Grid.Column key={'fortPlayer' + index}>
                                <Image src={props.players.fortniteOutfit[index]} className='fort-icon-outfit' size='massive' circular/>
                                <Header as='h1' inverted icon textAlign="center" className='fortnite-font-bordered fort-header-player'>
                                    {item}
                                </Header>
                            </Grid.Column>
                        )
                    )
                }
            </Grid>
            <br/>
            <p style={{textAlign:'center'}}>
                <Image src={voltarBtnImg}  onClick={props.previousBtn} style={{cursor: 'pointer', height: '50px', display: 'inline-block', marginRight: "10px"}}/>
                <Image src={prosseguirBtnImg} onClick={props.nextBtn} style={{cursor: 'pointer', height: '50px', display: 'inline-block'}}/>
                {/* <Button inverted size='big' onClick={props.previousBtn} basic> <Icon name='angle left' /> VOLTAR </Button>
                <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button> */}
            </p>
            <br/>
        </Container>
    </Transition>
);

const FortnitePage = (props) => {

    let history = useHistory();

    const isSmall = useMediaQuery({ query: '(max-width: 550px)' });
    
    let [modalInfoOpen, setModalInfoOpen] = useState(false);

    let [showIntro, setShowIntro] = useState(false);
    let [showPlayerSegment, setShowPlayerSegment] = useState(false);
    let [showPresentationName, setShowPresentationName] = useState(false);
    let [showPresentationGame, setShowPresentationGame] = useState(false);

    let [showPlayersList, setShowPlayersList] = useState(false);

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

    const startActPresentation = (setActPresentation, setPreviousPresentation, actualMilis, previousMilis, bgClass) =>{
        setTimeout(() => {
            setPreviousPresentation(false);
            setTimeout(() => {
                if(bgClass !== null){
                    props.setAppClass(bgClass);
                }
                setActPresentation(true);
            }, actualMilis);
        }, previousMilis);
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

                    // startActPresentation(setShowPresentationLogo, setShowPresentationGame, 100, 1300, 'bbb-white');
                    // setTimeout(() => {
                        startActPresentation(setShowPlayersList, setShowPresentationGame, 100, 5000, null);
                        // setTimeout(() => {
                        //     setAnimationSlidingDiagonals(true);
                        // }, 2000);
                    // }, 2000);
                }, 1000);
            }, 1500);
        }, 1000);
    }

    let hide = 0;
    let show = 3000;

    return(<>
            <Transition visible={showPlayersList} animation='fade' duration={1000}>
                <div style={{backgroundImage: 'url('+ fortBack +')', backgroundSize: '100% 100%', position: 'fixed', width: '100%', height: '110vh', zIndex: '0', backgroundRepeat: "no-repeat"}}></div>
            </Transition>
                <Button className='corner-btn' circular basic inverted icon='home' onClick={() => homePage()} />
                <Button className='corner-right-btn' circular basic inverted icon='info' onClick={() => setModalInfoOpen(true)} />
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
                        <Container>
                            <br/>
                            <br/>
                            <Image src={fortniteLogo} size='medium' centered/>
                            <Header as='h1' inverted textAlign='center' >
                                Por: <b>{props.nome}</b>
                            </Header>
                            <PlayersForm 
                                game={3} 
                                emojis={props.emojis} 
                                fortniteOutfits={props.fortniteOutfits}
                                playerNames={props.playerNames} 
                                setPlayerNames={props.setPlayerNames} 
                                startPresentation={startPresentation} 
                            />
                            <br/>
                        </Container>
                    </div>
                </Transition>
                <Transition visible={showPresentationName} animation='fade' duration={1000}>
                    <div style={{width: '100%', height: '100vh'}}>
                        <span className='span-grettings'>
                            <Header className='header-greetings fortnite-font-bordered' as='h1' inverted textAlign='center' >
                                <b style={{textTransform: 'uppercase'}}>{props.nome}</b>
                                <Header.Subheader>
                                    Apresenta:
                                </Header.Subheader>
                            </Header>
                        </span>
                    </div>
                </Transition>
                <Transition visible={showPresentationGame} animation='zoom' duration={{hide, show}}>
                    <div style={{width: '100%', height: '100vh'}}>
                        <span className='span-grettings'>
                            <Image src={fortniteLogo} size='huge' centered/>
                        </span>
                    </div>
                </Transition>
                <GroupListPresentiton 
                    visible={showPlayersList} 
                    players={props.playerNames} 
                    isSmall={isSmall}

                    previousBtn = {() => {
                        startActPresentation(setShowPlayerSegment, setShowPlayersList, 1000, 0, 'fortnite-bg');
                    }}

                    nextBtn = { () => {}
                        // () => showStoryline(0)
                    }
                />
            <ModalInfo
                open={modalInfoOpen} 
                onClose={() => setModalInfoOpen(false)}
                onOpen={() => setModalInfoOpen(true)}
            />
        </>
    );
}

export default FortnitePage;