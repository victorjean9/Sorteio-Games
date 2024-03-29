import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Transition } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import '../styles/HungerGames.css';

import hgIntro from '../images/fortnite/fortintro.png';
import fortniteLogo from '../images/fortnite.png';
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";
import ModalInfo from "../components/ModalInfo";
import { useMediaQuery } from "react-responsive";

import fortBack from "../images/fortnite/spiked.jpg";
import fortWinnerBack from "../images/fortnite/spiked_winner.jpg";
import fortVictoryRoyale from "../images/fortnite/victory.png";
import prosseguirBtnImg from "../images/fortnite/prosseguir_btn.jpg";
import voltarBtnImg from "../images/fortnite/voltar_btn.jpg";
import crownFort from "../images/fortnite/crown.png";

import styled from "styled-components";
import useLongPress from "../components/exported/useLongPress";
import FortniteLogic from "../components/FortniteLogic";

const FortniteBackground = styled.div`
    background-image: url(${(props) => {return props.image;}});
    background-size: 100% 100%;
    position: fixed;
    width: 100%;
    height: 110vh;
    z-index: 0;
    backgroundRepeat: no-repeat;
`;

const FortniteButton = styled(Image)`
    cursor: pointer !important;
    height: 50px !important;
    display: inline-block !important;
    ${(props) => { return props.espacado ? `margin-right: 10px !important;` : null; }}
`;

const GroupListPresentiton = (props) => (
    <Transition visible={props.visible} animation='fade' duration={1000}>
        <Container>
            <br/>
            <br/>
            <Grid>
                <Grid.Column>
                    <Header as='h1' inverted textAlign='center' icon className='fortnite-font fort-header'> 
                        <Header.Content>O ÔNIBUS DE BATALHA IRÁ PARTIR EM INSTANTES</Header.Content>
                    </Header>
                    <Divider/>
                </Grid.Column>
            </Grid>
            <Grid columns={props.isSmall ? 3 : 6} centered>
                {   
                    props.players.map(
                        (item, index) => (
                            <Grid.Column key={'fortPlayer' + index}>
                                <Image src={item.fortniteOutfit} className='fort-icon-outfit' size='massive' circular/>
                                <Header as='h1' inverted icon textAlign="center" className='fortnite-font-bordered fort-header-player'>
                                    {
                                        item.crown ? <Image size='tiny' src={crownFort} inline/> : null
                                    }
                                    {item.name}
                                </Header>
                            </Grid.Column>
                        )
                    )
                }
            </Grid>
            <br/>
            <p style={{textAlign:'center'}}>
                <FortniteButton src={voltarBtnImg}  onClick={props.previousBtn} espacado/>
                <FortniteButton src={prosseguirBtnImg} onClick={props.nextBtn}/>
            </p>
            <br/>
        </Container>
    </Transition>
);

const StorylinePresentation = (props) => {

    let [storyArray, setStoryArray] = useState([]);
    let [showControls, setShowControls] = useState(true);

    useEffect(() => {
        setStoryArray(props.story.slice(0, 1));
        if(props.story.length > 1)
            setShowControls(false);
        else   
            setShowControls(true);
    }, [props.story]);

    const showMore = () => {
        setStoryArray(props.story.slice(0, storyArray.length + 1));
        if(storyArray.length + 1 === props.story.length){
            setShowControls(true);
        }
    }   

    const onLongPress = () => {
        setStoryArray(props.story);
        setShowControls(true);
    };

    const onClick = () => {
        showMore();
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <Transition visible={props.visible} animation={props.animation} duration={1000}>
            <Container>
                        <br/>
                        <br/>
                        <Grid>
                            <Grid.Column>
                                <Header as='h1' inverted textAlign='center' className='fortnite-font fortnite-font-bordered fort-header'>
                                    {props.onda}ª Onda
                                </Header>
                            <Divider/>
                            <Transition.Group
                                as={List}
                                duration={200}
                                divided
                                size='massive'
                                verticalAlign='middle'
                                >
                                {
                                    storyArray.map(
                                        (item, index) => (
                                            <List.Item key={'storyOccurrence' + index} ><p className='fortnite-font fort-header-story fortnite-font-bordered' style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: item}}/></List.Item>
                                        )
                                    )
                                }
                            </Transition.Group>
                            {
                                !showControls 
                                ?   <p style={{textAlign: 'center'}}><Button inverted size='big' {...longPressEvent} basic circular icon><Icon name='angle down' /></Button></p>
                                :   null
                            }
                            <br/>
                            {
                                showControls 
                                ?   <p style={{textAlign:'center'}}>
                                        <FortniteButton src={voltarBtnImg}  onClick={props.previousBtn} espacado/>
                                        <FortniteButton src={prosseguirBtnImg} onClick={props.nextBtn}/>
                                    </p>
                                :   null
                            }

                            </Grid.Column>
                        </Grid>
                        <br/>
            </Container>
        </Transition>
    );
} 

const WinnerSegment = (props) => {
    return(
        <Transition visible={props.visible} animation='fade' duration={1000}>
            <div style={{width: '100%', height: '100vh'}}>
                <span className='span-grettings'>
                    <Image src={fortVictoryRoyale} size='large'  centered/>
                    <Image src={props.winner.fortniteOutfit} className='fort-icon-outfit' size='small' circular centered/>
                    <Header className='header-greetings' as='h1' inverted textAlign='center' >
                        <b style={{textTransform: 'uppercase'}} className='fortnite-font fortnite-font-bordered'>{props.winner.name}</b>
                        <Header.Subheader className='fortnite-font fortnite-font-bordered fort-header-story'>
                            GANHOU O SORTEIO{ props.winner.crown ? " COM COROA " : "" }!
                        </Header.Subheader>
                    </Header>
                    <br/>
                    <br/>
                    <br/>
                </span>
            </div>
        </Transition>
    );
}

const FortnitePage = (props) => {

    let history = useHistory();

    const isSmall = useMediaQuery({ query: '(max-width: 550px)' });
    
    let [modalInfoOpen, setModalInfoOpen] = useState(false);

    let [playersList, setPlayersList] = useState([]);

    let [showIntro, setShowIntro] = useState(false);
    let [showPlayerSegment, setShowPlayerSegment] = useState(false);
    let [showPresentationName, setShowPresentationName] = useState(false);
    let [showPresentationGame, setShowPresentationGame] = useState(false);

    let [showPlayersList, setShowPlayersList] = useState(false);
    let [storyline, setStoryline] = useState();

    let [showStorylinePresentation, setShowStorylinePresentation] = useState(false);
    let [storylineOcurrencies, setStorylineOcurrencies] = useState([]);
    let [onda, setOnda] = useState(1);

    let [showWinnerPresentation, setShowWinnerPresentation] = useState(false);
    let [winner, setWinner] = useState({name: "", fortniteOutfit: ''});

    let [prevActBtn, setPrevActBtn ] = useState(() => {});
    let [nextActBtn, setNextActBtn ] = useState(() => {});

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

    const randomize = (total) => {
        return Math.floor(Math.random() * total);
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

        let playersArray = [];
        let indexAux = 0;
        props.playerNames.val.forEach(element => {
            let hasCrown = false;
            hasCrown = randomize(100) > 80;

            playersArray.push({name: element, fortniteOutfit: props.playerNames.fortniteOutfit[indexAux], crown: hasCrown});
            indexAux++;
        });

        setPlayersList(playersArray);

        let game = FortniteLogic.generateGame(playersArray);
        setStoryline(game);
        console.log(game);

        setShowPlayerSegment(false);
        setTimeout(() => {
            props.setAppClass('black-presentation-bg');
            setShowPresentationName(true);
            setTimeout(() => {
                setShowPresentationName(false);
                setTimeout(() => {
                    setShowPresentationGame(true);
                    props.setAppClass('fn-presentation-bg');
                    startActPresentation(setShowPlayersList, setShowPresentationGame, 100, 5000, null);
                }, 1000);
            }, 1500);
        }, 1000);
    }

    const showStoryline = (index) => {
        if(index < storyline.story.length){
            if(index === 0) {
                startActPresentation(setShowStorylinePresentation, setShowPlayersList, 1000, 0, 'black-presentation-bg');
            }

            setOnda(storyline.story[index].wave);
            setStorylineOcurrencies(storyline.story[index].occurrencies);
            setShowStorylinePresentation(true);

            setPrevActBtn(() => () => {
                if(index === 0){
                    startActPresentation(setShowPlayersList, setShowStorylinePresentation, 1000, 0, null);
                } else {
                    setShowStorylinePresentation(false);
                    setTimeout(() => {
                        showStoryline(index-1);
                    }, 100);
                }
            });
            setNextActBtn(() => () => {
                setShowStorylinePresentation(false);
                setTimeout(() => {
                    showStoryline(index+1);
                }, 100);
            });
        } else {
            // WINNER
            setWinner(storyline.winner);
            startActPresentation(setShowWinnerPresentation, setShowStorylinePresentation, 1000, 0, 'fn-presentation-bg');
        }
    }

    let hide = 0;
    let show = 3000;

    return(<>
            <Transition visible={showPlayersList || showStorylinePresentation} animation='fade' duration={1000}>
                <FortniteBackground image={fortBack} />
            </Transition>
            <Transition visible={showWinnerPresentation} animation='fade' duration={1000}>
                <FortniteBackground image={fortWinnerBack} />
            </Transition>
            <Button className='corner-btn' circular basic inverted icon='home' onClick={() => homePage()} />
            <Button className='corner-right-btn' circular basic inverted icon='info' onClick={() => setModalInfoOpen(true)} />
            <Transition visible={showIntro} animation='fade up' duration={1000}>
                <div className='hg-intro' style={{backgroundImage: 'url(' + hgIntro +')'}}>
                    <Header as='h2' className='loading-bottom' inverted>
                        <Icon name='circle notch' loading size='big' />
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
                players={playersList} 
                isSmall={isSmall}

                previousBtn = {() => {
                    startActPresentation(setShowPlayerSegment, setShowPlayersList, 1000, 0, 'fortnite-bg');
                }}

                nextBtn = { () => showStoryline(0) }
            />
            <StorylinePresentation
                visible={showStorylinePresentation}
                story={storylineOcurrencies}
                onda={onda}

                previousBtn = {() => prevActBtn()}
                nextBtn = {() => nextActBtn()}
            />
            <WinnerSegment
                emojis={props.emojis}
                visible={showWinnerPresentation}
                winner={winner}
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