import React, { useEffect, useRef, useState } from "react";
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";
import { Button, Container, Header, Icon, Image, Transition, Divider, Grid, List } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import ModalInfo from "../components/ModalInfo";
import '../styles/BBB.css';
import '../styles/Emojis.css';
import '../styles/Animojis.css';

import BBBIntro from '../images/bbb-robos.png';
import BBBLogo from '../images/bbb-logo.png';
import PopcornAnimoji from '../images/animojis/popcorn.gif';
import CrownAnimoji from '../images/animojis/crown.gif';


import introVideo from '../videos/robo.webm';
import BBBLogic from "../components/BBBLogic";
import { useMediaQuery } from "react-responsive";
import SlidingDiagonals from "../components/backgrounds/SlidingDiagonals";
import BBBType from "../components/BBBType";


import muroImg from '../images/bbb/muro.jpg';
import duasCasasImg from '../images/bbb/duascasas.jpeg';
import duasEntradasImg from '../images/bbb/duasentradas.png';
import ColorfullWaves from "../components/backgrounds/ColofullWaves";

//BANNERS
import dinamicaMuroPipocaImg from '../images/bbb/bbb-muro-pipoca.jpg';
import dinamicaMuroCamaroteImg from '../images/bbb/bbb-muro-camarote.jpg';
import dinamicaCasaPrincipalImg from '../images/bbb/bbb-casa-principal.jpg';
import dinamicaCasaSecundariaImg from '../images/bbb/bbb-casa-secundaria.jpg';
import dinamicaPipocasManhaImg from '../images/bbb/bbb-pipocas-manha.jpg';
import dinamicaCamarotesNoiteImg from '../images/bbb/bbb-camarotes-noite.jpg';


const GroupsPresentation = (props) => (
    <Transition visible={props.visible} animation={props.animation} duration={1000}>
        <div style={{width: '100%', height: '100vh'}}>
            <span className='span-grettings'>
                <div style={{position: 'relative'}}>
                    <Container>
                        <Grid columns={2} >
                            <Grid.Column>
                                <Header as='h1' inverted textAlign='center' icon>
                                    <Image circular src={PopcornAnimoji} />
                                    <Header.Content>PIPOCA</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' inverted textAlign='center' icon>
                                    <Image circular src={CrownAnimoji} />
                                    <Header.Content>CAMAROTE</Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid>
                    </Container>
                    <Divider inverted vertical><Icon name='plus circle' /></Divider>
                </div>
                <br/>
                <Button inverted size='big' onClick={() => props.previousBtn()} basic> <Icon name='angle left' /> VOLTAR </Button>
                <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
            </span>
        </div>
    </Transition>
);

const GroupListPresentiton = (props) => (
    <Transition visible={props.visible} animation={props.animation} duration={1000}>
        <Container>
            <Grid columns={1} key={'GroupListPresentiton'} >
                <Grid.Column>
                    <br/>
                    <br/>
                    <Header as='h1' inverted textAlign='center' icon>
                        <Image circular src={PopcornAnimoji} />
                        <Header.Content>PIPOCA</Header.Content>
                    </Header>
                    <Divider/>
                    <Grid columns={props.isSmall ? 3 : 5}>
                        {   
                            props.groups.pipoca.map(
                                (item, index) => (
                                    <Grid.Column key={'pipoca' + index}>
                                        <Header as='h2' inverted icon textAlign="center">
                                            <Image src={props.emojis[item.emoji]}/>
                                            <Header.Content>{item.name}</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                )
                            )
                        }
                    </Grid>
                    <Header as='h1' inverted textAlign='center' icon>
                        <Image circular src={CrownAnimoji} />
                        <Header.Content>CAMAROTE</Header.Content>
                    </Header>
                    <Divider/>
                    <Grid columns={props.isSmall ? 3 : 5}>
                        {   
                            props.groups.camarote.map(
                                (item, index) => (
                                    <Grid.Column key={'camarote' + index}>
                                        <Header as='h2' inverted icon textAlign="center">
                                            <Image src={props.emojis[item.emoji]}/>
                                            <Header.Content>{item.name}</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                )
                            )
                        }
                    </Grid>
                    <br/>
                    <p style={{textAlign:'center'}}>
                        <Button inverted size='big' onClick={props.previousBtn} basic> <Icon name='angle left' /> VOLTAR </Button>
                        <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
                    </p>
                    <br/>
                </Grid.Column>
            </Grid>
        </Container>
    </Transition>
);

const WeekPresentation = (props) => (
    <Transition visible={props.visible} animation={props.animation} duration={1000}>
        <div style={{width: '100%', height: '100vh'}}>
            <span className='span-grettings'>
                <Container>
                    <Header as='h1' className="bbb-week-header" inverted textAlign='center' icon>
                        {props.week}ª SEMANA
                    </Header>
                </Container>
                <br/>
                <Button inverted size='big' onClick={() => props.previousBtn()} basic> <Icon name='angle left' /> VOLTAR </Button>
                <Button inverted size='big' onClick={() => props.nextBtn()} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
            </span>
        </div>
    </Transition>
);

const ActPresentation = (props) => (
    <Transition visible={props.visible} animation={props.animation} duration={1000}>
        <div style={{width: '100%', height: '100vh'}}>
            <span className='span-grettings'>
                <Header as='h1' inverted>{props.title}</Header><br/>
                <Image src={props.image} size={props.size} centered rounded/><br/>
                { props.description !== null ? <><Header as='h2' inverted>{props.description}</Header><br/></> : null }
                <Button inverted size='big' onClick={() => props.previousBtn()} basic> <Icon name='angle left' /> VOLTAR </Button>
                <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
            </span>
        </div>
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

    return (
        <Transition visible={props.visible} animation={props.animation} duration={1000}>
            <Container>
                <br/>
                <br/>

                <Image src={props.image} size='big' centered rounded/>
                <Header as='h1' inverted textAlign='center' >
                    {props.title}
                    <Header.Subheader>SEGUNDA-FEIRA</Header.Subheader>
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
                                <List.Item key={'storyOccurrence' + index} ><p style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: item}}/></List.Item>
                            )
                        )
                    }
                </Transition.Group>
                {
                    !showControls 
                    ?   <p style={{textAlign: 'center'}}><Button inverted size='big' onClick={() => showMore()} basic circular icon><Icon name='angle down' /></Button></p>
                    :   null
                }
                <br/>
                {
                    showControls 
                    ?   <p style={{textAlign:'center'}}>
                            <Button inverted size='big' onClick={props.previousBtn} basic> <Icon name='angle left' /> VOLTAR </Button>
                            <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
                        </p>
                    :   null
                }
                <br/>
            </Container>
        </Transition>
    );
} 


const BBBPage = (props) => {
    let history = useHistory();
    
    const isSmall = useMediaQuery({ query: '(max-width: 550px)' });
    
    let [showIntro, setShowIntro] = useState(false);
    let [showPlayerSegment, setShowPlayerSegment] = useState(false);
    let [showPresentationName, setShowPresentationName] = useState(false);
    let [showPresentationGame, setShowPresentationGame] = useState(false);
    let [showPresentationLogo, setShowPresentationLogo] = useState(false);

    let [showWeekPresentation, setShowWeekPresentation] = useState(false);
    let [showGroupsPresentation, setShowGroupsPresentation] = useState(false);
    let [showGroupsList, setShowGroupsList] = useState(false);
    let [showStoryactPresentation, setShowStoryactPresentation] = useState(false);

    let [storyactTitle, setStoryactTitle] = useState('');
    let [storyactDescription, setStoryactDescription] = useState(null);
    let [storyactImage, setStoryactImage] = useState();
    
    let [showStorylinePresentation, setShowStorylinePresentation] = useState(false);
    let [storylineOcurrencies, setStorylineOcurrencies] = useState([]);
    let [storylineTitle, setStorylineTitle] = useState('');
    let [storylineImage, setStorylineImage] = useState();

    let [actualWeek, setActualWeek] = useState(1);

    let [prevActBtn, setPrevActBtn ] = useState(() => {});
    let [nextActBtn, setNextActBtn ] = useState(() => {});

    let [storyline, setStoryline] = useState();
    let [groups, setGroups] = useState({pipoca: [], camarote: []});

    let [modalInfoOpen, setModalInfoOpen] = useState(false);

    let [animationSlidingDiagonals, setAnimationSlidingDiagonals] = useState(false);
    let [animationColorfullWaves, setAnimationColorfullWaves] = useState(false);

    const videoPlayer = useRef();

    useEffect(() => {
        props.setAppClass('bbb-bg');
        setShowIntro(true);

        setTimeout(() => {
            setShowIntro(false);
            setShowPlayerSegment(true);
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.title = "Sorteio de " + props.nome + " - Big Brother Brasil";
    }, [props.nome]);

    const homePage = () => {
        document.title = "Sorteio de " + props.nome;
        history.push(Rotas.base);
    }

    let startPresentation = () => {

        let groups = BBBLogic.generateGroups(props.playerNames);
        let game = BBBLogic.generateGame(groups);

        console.log(groups);
        console.log(game);
        setGroups(groups);
        setStoryline(game);

        // setShowPlayerSegment(false);
        // setTimeout(() => {
        //     props.setAppClass('black-presentation-bg');
        //     setShowPresentationName(true);
        //     setTimeout(() => {
        //         setShowPresentationName(false);
        //         setTimeout(() => {
        //             setShowPresentationGame(true);
        //             props.setAppClass('bbb-presentation-bg');
        //             videoPlayer.current.play();
        //             // startActPresentation(setShowGroupsPresentation, setShowPresentationGame, 100, 2000, null);
        //             startActPresentation(setShowPresentationLogo, setShowPresentationGame, 100, 1300, 'bbb-white');
        //             setTimeout(() => {
        //                 startActPresentation(setShowGroupsPresentation, setShowPresentationLogo, 100, 2000, null);
        //                 setTimeout(() => {
        //                     setAnimationSlidingDiagonals(true);
        //                 }, 2000);
        //             }, 2000);
        //         }, 1000);
        //     }, 1500);
        // }, 1000);
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

    const showStoryline = (index) => {
        if(index < storyline.story.length){
            
            let type = storyline.story[index].type;
        
            switch (type) {
                case BBBType.SEMANA: // MOSTRA SEMANA
                    let week = storyline.story[index].week;
                    startActPresentation(setShowWeekPresentation, setShowGroupsList, 1000, 0, null);
                    setTimeout(() => {
                        setAnimationSlidingDiagonals(false);
                        setAnimationColorfullWaves(true);
                    }, 1000);

                    setActualWeek(week);

                    if(week === 1){
                        setPrevActBtn(() => () => {
                            startActPresentation(setShowGroupsPresentation, setShowWeekPresentation, 1000, 0, null);
                            setTimeout(() => {
                                setAnimationColorfullWaves(false);
                                setAnimationSlidingDiagonals(true);
                            }, 1000);
                        });
                    } else {
                        setPrevActBtn(() => () => {
                            setAnimationColorfullWaves(false);
                            showStoryline(index-1);
                        });
                    }
                    setNextActBtn(() => () => {
                        showStoryline(index+1);
                        setTimeout(() => {
                            setAnimationColorfullWaves(false);
                        }, 1000);
                    });
                    break;
                case BBBType.DINAMICA:
                    let dynamic = storyline.story[index].dynamic;

                    switch (dynamic) {
                        case 0: // Muro
                            startActPresentation(setShowStoryactPresentation, setShowWeekPresentation, 1000, 0, 'bbb-dinamica-muro');
                            setTimeout(() => {
                                setStoryactImage(muroImg);
                                setStoryactTitle('O MURO');
                                setStoryactDescription(
                                    <>Nesta edição um muro divide a casa em dois lados.<br/>De um lado ficarão os participantes pipocas, e do outro lado os camarotes.</>
                                );
                            }, 900);
                            break;
                        case 1: // Segunda Casa
                            startActPresentation(setShowStoryactPresentation, setShowWeekPresentation, 1000, 0, 'bbb-dinamica-duas-casas');
                            setTimeout(() => {
                                setStoryactImage(duasCasasImg);
                                setStoryactTitle('DUAS CASAS');
                                setStoryactDescription(
                                    <>Nesta edição a maioria dos participantes entrará na casa principal do BBB.<br/>O resto, que foi escolhido pelo público, entrará numa casa secundária e já imune.</>
                                );
                            }, 900);
                            break;
                        case 2:
                    
                        default: // Pipocas entram de manhã, camarote de noite.
                            startActPresentation(setShowStoryactPresentation, setShowWeekPresentation, 1000, 0, 'bbb-dinamica-duas-entradas');
                            setTimeout(() => {
                                setStoryactImage(duasEntradasImg);
                                setStoryactTitle('DUAS ENTRADAS');
                                setStoryactDescription('Nesta edição os participantes pipoca entrarão na casa pela manhã, e os camarores entrarão de noite.');
                            }, 900);
                            break;
                    }

                    setPrevActBtn(() => () => {
                        setShowStoryactPresentation(false);
                        setTimeout(() => {
                            showStoryline(index-1);
                        }, 100);
                    });
                    setNextActBtn(() => () => {
                        setShowStoryactPresentation(false);
                        setTimeout(() => {
                            showStoryline(index+1);
                        }, 100);
                    });
                    break;
                case BBBType.MUROPIPOCA:
                case BBBType.MUROCAMAROTE:
                    setStorylineTitle(type === BBBType.MUROPIPOCA ? 'AS PIPOCAS ENTRAM NO SEU LADO DA CASA' : 'OS CAMAROTES ENTRAM NO SEU LADO DA CASA');
                    setStorylineImage(type === BBBType.MUROPIPOCA ? dinamicaMuroPipocaImg : dinamicaMuroCamaroteImg);
                    setStorylineOcurrencies(storyline.story[index].occurrencies);
                    setShowStorylinePresentation(true);

                    setPrevActBtn(() => () => {
                        setShowStorylinePresentation(false);
                        setTimeout(() => {
                            showStoryline(index-1);
                        }, 100);
                    });
                    setNextActBtn(() => () => {
                        setShowStorylinePresentation(false);
                        setTimeout(() => {
                            showStoryline(index+1);
                        }, 100);
                    });
                    break;

                case BBBType.CASAPRINCIPAL:
                case BBBType.CASASECUNDARIA:
                    setStorylineTitle(type === BBBType.CASAPRINCIPAL ? 'ENTRADA NA CASA DO BBB' : 'ENTRADA DOS IMUNIZADOS NA OUTRA CASA');
                    setStorylineImage(type === BBBType.CASAPRINCIPAL ? dinamicaCasaPrincipalImg : dinamicaCasaSecundariaImg);
                    setStorylineOcurrencies(storyline.story[index].occurrencies);
                    setShowStorylinePresentation(true);

                    setPrevActBtn(() => () => {
                        setShowStorylinePresentation(false);
                        setTimeout(() => {
                            showStoryline(index-1);
                        }, 100);
                    });
                    setNextActBtn(() => () => {
                        setShowStorylinePresentation(false);
                        setTimeout(() => {
                            showStoryline(index+1);
                        }, 100);
                    });
                    break;

                case BBBType.PIPOCASMANHA:
                case BBBType.CAMAROTESNOITE:
                    setStorylineTitle(type === BBBType.PIPOCASMANHA ? 'ENTRADA DOS PIPOCAS PELA MANHÃ' : 'ENTRADA DOS CAMAROTES PELA NOITE');
                    setStorylineImage(type === BBBType.PIPOCASMANHA ? dinamicaPipocasManhaImg : dinamicaCamarotesNoiteImg);
                    setStorylineOcurrencies(storyline.story[index].occurrencies);
                    setShowStorylinePresentation(true);

                    setPrevActBtn(() => () => {
                        setShowStorylinePresentation(false);
                        setTimeout(() => {
                            showStoryline(index-1);
                        }, 100);
                    });
                    setNextActBtn(() => () => {
                        setShowStorylinePresentation(false);
                        setTimeout(() => {
                            showStoryline(index+1);
                        }, 100);
                    });
                    break;
            
                default:
                    alert('default');
            }
        }
        //  else {
            // WINNER
        //     setWinner(storyline.winner);
        //     startActPresentation(setShowWinnerPresentation, setShowStorylinePresentation, 1000, 0, 'hunger-games-bg');
        // }
    }

    let hide = 0;
    let show = 1000;

    let hideLogo = 1000;
    let showLogo = 0;

    return(<>
            <SlidingDiagonals visible={animationSlidingDiagonals}/>
            <ColorfullWaves visible={animationColorfullWaves} week={actualWeek}/>
            <Button className='corner-btn' circular basic inverted icon='home' onClick={() => homePage()} />
            <Button className='corner-right-btn' circular basic inverted icon='info' onClick={() => setModalInfoOpen(true)} />
            <Transition visible={showIntro} animation='fade up' duration={1000}>
                <div className='bbb-intro' style={{backgroundImage: 'url(' + BBBIntro +')'}}>
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
                        <Image src={BBBLogo} size='medium' centered/>
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
            
            <Transition visible={showPresentationGame} animation='zoom' duration={{hide, show}}>
                <div style={{width: '100%', height: '100vh'}}>
                    <video ref={videoPlayer} style={{width: '100%', height: '100%'}}>
                        <source src={introVideo} type="video/webm" />
                    </video>
                </div>
            </Transition>
            <Transition visible={showPresentationLogo} animation='zoom' duration={{hideLogo, showLogo}}>
                <div style={{width: '100%', height: '100vh'}}>
                    <span className='span-grettings'>
                        <Image src={BBBLogo} size='huge' centered/>
                    </span>
                </div>
            </Transition>

            <GroupsPresentation 
                visible={showGroupsPresentation} 
                animation='fade' 

                previousBtn = {() => {
                    startActPresentation(setShowPlayerSegment, setShowGroupsPresentation, 1000, 0, 'bbb-bg');
                    setTimeout(() => {
                        setAnimationSlidingDiagonals(false);
                    }, 1000);
                }}

                nextBtn = {() => {
                    startActPresentation(setShowGroupsList, setShowGroupsPresentation, 1000, 0, null);
                }}
            />
            <GroupListPresentiton 
                visible={showGroupsList} 
                groups={groups} 
                emojis={props.emojis}
                isSmall={isSmall}

                previousBtn = {() => {
                    startActPresentation(setShowGroupsPresentation, setShowGroupsList, 1000, 0, null);
                }}

                nextBtn = {() => showStoryline(0)}
            />
            <WeekPresentation
                visible={showWeekPresentation} 
                animation='fade' 
                week={actualWeek}

                previousBtn={() => prevActBtn()}

                nextBtn = {() => nextActBtn()}
            />
            <ActPresentation 
                visible={showStoryactPresentation} 
                animation='fade' 
                image={storyactImage} 
                size='big' 
                title={storyactTitle}
                description={storyactDescription}

                previousBtn={() => prevActBtn()}

                nextBtn = {() => nextActBtn()}
            />
            <StorylinePresentation
                visible={showStorylinePresentation}
                title={storylineTitle}
                story={storylineOcurrencies}
                image={storylineImage}

                previousBtn = {() => prevActBtn()}

                nextBtn = {() => nextActBtn()}
            />

            <ModalInfo
                open={modalInfoOpen} 
                onClose={() => setModalInfoOpen(false)}
                onOpen={() => setModalInfoOpen(true)}
            />
        </>
    );
}

export default BBBPage;