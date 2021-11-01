import { useEffect, useState } from "react";
import { Button, Card, Container, Divider, Header, Icon, Image, List, Transition } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import '../styles/HungerGames.css';

import hgIntro from '../images/katniss.png';
import hungerGamesLogo from '../images/jogos-vorazes.png';
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";

import theReaping from '../images/hunger-games/the-reaping.jpg';
import cornucopia from '../images/hunger-games/cornucopia.jpeg';
import day from '../images/hunger-games/day.jpg';
import night from '../images/hunger-games/night.jpg';
import theFeast from '../images/hunger-games/the-feast.jpg';
import deaths from '../images/hunger-games/deaths.jpg';

import HungerGamesLogic from "../components/HungerGamesLogic";

const ActPresentation = (props) => {
    return(
        <Transition visible={props.visible} animation={props.animation} duration={1000}>
            <div style={{width: '100%', height: '100vh'}}>
                <span className='span-grettings'>
                    <Header as='h1' inverted>{props.title}</Header><br/>
                    <Image src={props.image} size={props.size} centered rounded/><br/>
                    <Button inverted size='big' onClick={() => props.previousBtn()} basic> <Icon name='angle left' /> VOLTAR </Button>
                    <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
                </span>
            </div>
        </Transition>
    );
}

const StorylinePresentation = (props) => {

    return (
        <Transition visible={props.visible} animation={props.animation} duration={1000}>
            <Container>
                <br/>
                <br/>
                <Header as='h1' inverted textAlign='center' >
                    {props.title}
                </Header>
                <Divider/>
                {
                    props.type === 1
                    ?   props.story.length > 0
                        ?   <Header as='h1' inverted textAlign='center'>{props.story.length} { props.story.length === 1 ? 'tiro de canhão pode ser ouvido à distância.' : 'tiros de canhão puderam ser ouvidos à distância.'} </Header>
                        :   <Header as='h1' inverted textAlign='center'>Nenhum tiro de canhão pode ser ouvido à distância.</Header>
                    :   null
                }
                <List inverted size='massive'>
                    {   
                        props.story.map(
                            (item, index) => (
                                <List.Item key={'storyOccurrence' + index} ><p style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: item}}/></List.Item>
                            )
                        )
                    }
                </List>
                <br/>
                <p style={{textAlign:'center'}}>
                    <Button inverted size='big' onClick={props.previousBtn} basic> <Icon name='angle left' /> VOLTAR </Button>
                    <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
                </p>
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
                    <Header className='header-greetings' as='h1' inverted textAlign='center' >
                        🥇<b style={{textTransform: 'uppercase'}}>{props.winner}</b>🏆
                        <Header.Subheader>
                            GANHOU O SORTEIO!
                        </Header.Subheader>
                    </Header>
                </span>
            </div>
        </Transition>
    );
}

const TheReapingList = (props) => {

    return (
        <Transition visible={props.visible} animation={props.animation} duration={1000}>
            <Container>
                <br/>
                <br/>
                <Header as='h1' inverted textAlign='center' >
                    A COLHEITA
                </Header>
                <Divider/>
                <Card.Group centered>
                    {   
                        props.districts.map(
                                (item, index) => {
                                    let header = 'Distrito ' + (index + 1);
                                    let description = item[0];
                                    if(item.length > 1) {
                                        description += ' e ' + item[1]
                                    }

                                    return (
                                        <Card
                                            key={'cardDistrict' + index}
                                            className='district'
                                            header={header}
                                            description={description}
                                        />
                                    )
                                }
                            )
                    }
                </Card.Group>
                <br/>
                <p style={{textAlign:'center'}}>
                    <Button inverted size='big' onClick={props.previousBtn} basic> <Icon name='angle left' /> VOLTAR </Button>
                    <Button inverted size='big' onClick={props.nextBtn} basic>PROSSEGUIR <Icon name='angle right' /> </Button>
                </p>
                <br/>
            </Container>
        </Transition>
    );
} 

const HungerGamesPage = (props) => {
    let history = useHistory();
    
    let [showIntro, setShowIntro] = useState(false);
    let [showPlayerSegment, setShowPlayerSegment] = useState(false);
    let [showPresentationName, setShowPresentationName] = useState(false);
    let [showPresentationGame, setShowPresentationGame] = useState(false);
    let [showTheReapingPresentation, setShowTheReapingPresentation] = useState(false);
    let [showTheReapingList, setShowTheReapingList] = useState(false);
    let [showStoryactPresentation, setShowStoryactPresentation] = useState(false);
    let [showStorylinePresentation, setShowStorylinePresentation] = useState(false);
    let [showWinnerPresentation, setShowWinnerPresentation] = useState(false);

    let [storyactTitle, setStoryactTitle] = useState('');
    let [storyactImage, setStoryactImage] = useState(cornucopia);

    let [storylineOcurrencies, setStorylineOcurrencies] = useState([]);
    let [storylineType, setStorylineType] = useState(0);

    let [prevActBtn, setPrevActBtn ] = useState(() => {});
    let [nextActBtn, setNextActBtn ] = useState(() => {});

    let [prevStoryBtn, setPrevStoryBtn ] = useState(() => {});
    let [nextStoryBtn, setNextStoryBtn ] = useState(() => {});

    // let [storylineTitle, setStorylineTitle] = useState('');
    let [winner, setWinner] = useState('');

    let [storyline, setStoryline] = useState();
    let [districts, setDistricts] = useState([]);

    let [storylineIndex, setStorylineIndex] = useState(0);

    useEffect(() => {
        props.setAppClass('hunger-games-bg');
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

    const generateDistricts = () => {

        let allDistricts = [];
        let newDisctrict = [];

        props.playerNames.val.forEach(element => {
            newDisctrict.push(element);
            if(newDisctrict.length === 2) {
                allDistricts.push(newDisctrict);
                newDisctrict = [];
            }
        });

        if(newDisctrict.length !== 0) {
            allDistricts.push(newDisctrict);
        }

        setDistricts(allDistricts);
    }

    let startPresentation = () => {

        generateDistricts();
        storylineIndex = 0;
        setStoryline(HungerGamesLogic.generateGame(props.playerNames.val));

        setShowPlayerSegment(false);
        setTimeout(() => {
            props.setAppClass('black-presentation-bg');
            setShowPresentationName(true);
            setTimeout(() => {
                setShowPresentationName(false);
                setTimeout(() => {
                    setShowPresentationGame(true);
                    props.setAppClass('hg-presentation-bg');
                    startActPresentation(setShowTheReapingPresentation, setShowPresentationGame, 100, 5000, 'hg-the-reaping');
                }, 1000);
            }, 1500);
        }, 1000);
    }

    const startActPresentation = (setActPresentation, setPreviousPresentation, actualMilis, previousMilis, bgClass) =>{
        setTimeout(() => {
            setPreviousPresentation(false);
            setTimeout(() => {
                props.setAppClass(bgClass);
                setActPresentation(true);
            }, actualMilis);
        }, previousMilis);
    }

    const showStoryline = () => {
        if(storylineIndex < storyline.story.length){
            let type = storyline.story[storylineIndex].type;
        
            switch (type) {
                case 1: // DAY
                    setPrevActBtn(() => () => {
                        // setStorylineIndex(storylineIndex-1);
                        // startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-the-reaping');
                    });

                    setNextActBtn(() => () => {
                        startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-day');
                    });

                    setPrevStoryBtn(() => () => {
                        startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-day');
                    });

                    startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-day');
                    setTimeout(() => {
                        setStoryactImage(day);
                        setStoryactTitle('DIA ' + storyline.story[storylineIndex].day);
                        setStorylineOcurrencies(storyline.story[storylineIndex].occurrencies);
                        setStorylineType(0);
                    }, 900);
                    break;
                case 2: // DEATHS
                    setPrevActBtn(() => () => {
                        // setStorylineIndex(storylineIndex-2);
                        // showStoryline();
                        // startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-the-reaping');
                    });

                    setNextActBtn(() => () => {
                        startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-deaths');
                    });

                    setPrevStoryBtn(() => () => {
                        startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-deaths');
                    });

                    startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-deaths');
                    setTimeout(() => {
                        setStoryactImage(deaths);
                        setStoryactTitle('MORTES');
                        setStorylineOcurrencies(storyline.story[storylineIndex].deaths);
                        setStorylineType(1);
                    }, 900);
                    break;
                case 3: // NIGHT
                    setPrevActBtn(() => () => {
                        // setStorylineIndex(storylineIndex-2);
                        // showStoryline();
                        // startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-the-reaping');
                    });

                    setNextActBtn(() => () => {
                        startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-night');
                    });

                    setPrevStoryBtn(() => () => {
                        startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-night');
                    });

                    startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-night');
                    setTimeout(() => {
                        setStoryactImage(night);
                        setStoryactTitle('NOITE ' + storyline.story[storylineIndex].day);
                        setStorylineOcurrencies(storyline.story[storylineIndex].occurrencies);
                        setStorylineType(0);
                    }, 900);
                    break;
                case 4: // FEAST
                    setPrevActBtn(() => () => {
                        // setStorylineIndex(storylineIndex-2);
                        // startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-the-reaping');
                    });

                    setNextActBtn(() => () => {
                        startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-the-feast');
                    });

                    setPrevStoryBtn(() => () => {
                        startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-the-feast');
                    });

                    startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-the-feast');
                    setTimeout(() => {
                        setStoryactImage(theFeast);
                        setStoryactTitle('O FESTIVAL');
                        setStorylineOcurrencies(storyline.story[storylineIndex].occurrencies);
                        setStorylineType(0);
                    }, 900);
                    break;
            
                default: // 0 - BLOODBATH
                    
                    setPrevActBtn(() => () => {
                        startActPresentation(setShowTheReapingList, setShowStoryactPresentation, 1000, 0, 'hg-the-reaping');
                    });

                    setNextActBtn(() => () => {
                        startActPresentation(setShowStorylinePresentation, setShowStoryactPresentation, 1000, 0, 'hg-the-bloodbath');
                    });

                    setPrevStoryBtn(() => () => {
                        startActPresentation(setShowStoryactPresentation, setShowStorylinePresentation, 1000, 0, 'hg-the-bloodbath');
                    });

                    startActPresentation(setShowStoryactPresentation, setShowTheReapingList, 1000, 0, 'hg-the-bloodbath');
                    setTimeout(() => {
                        setStoryactImage(cornucopia);
                        setStoryactTitle('O BANHO DE SANGUE');
                        setStorylineOcurrencies(storyline.story[storylineIndex].occurrencies);
                        setStorylineType(0);
                    }, 900);
                    break;
            }
            setStorylineIndex(storylineIndex+1);
        } else {
            // WINNER
            setWinner(storyline.winner);
            startActPresentation(setShowWinnerPresentation, setShowStorylinePresentation, 1000, 0, 'hunger-games-bg');
        }
    }

    let hide = 0;
    let show = 3000;

    return(<>
            <Button className='corner-btn' circular basic inverted icon='home' onClick={() => homePage()} />
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
                        <Image src={hungerGamesLogo} size='medium' centered/>
                        <Header as='h1' inverted textAlign='center' >
                            Por: <b>{props.nome}</b>
                        </Header>
                        <PlayersForm game={0} playerNames={props.playerNames} setPlayerNames={props.setPlayerNames} startPresentation={startPresentation} />
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
                    <span className='span-grettings'>
                        <Image src={hungerGamesLogo} size='huge' centered/>
                    </span>
                </div>
            </Transition>
            <ActPresentation 
                visible={showTheReapingPresentation} 
                animation='fade' 
                image={theReaping} 
                size='big' 
                title='A COLHEITA' 

                previousBtn = {() => {
                    startActPresentation(setShowPlayerSegment, setShowTheReapingPresentation, 1000, 0, 'hunger-games-bg');
                }}

                nextBtn = {() => {
                    startActPresentation(setShowTheReapingList, setShowTheReapingPresentation, 1000, 0, 'hg-the-reaping');
                }}
            />
            <TheReapingList 
                visible={showTheReapingList} 
                districts={districts} 

                previousBtn = {() => {
                    startActPresentation(setShowTheReapingPresentation, setShowTheReapingList, 1000, 0, 'hg-the-reaping');
                }}

                nextBtn = {() => showStoryline()}
            />
            <ActPresentation 
                visible={showStoryactPresentation} 
                animation='fade' 
                image={storyactImage} 
                size='big' 
                title={storyactTitle}

                previousBtn={() => {prevActBtn()}}

                nextBtn = {() => nextActBtn()}
            />
            <StorylinePresentation
                visible={showStorylinePresentation}
                title={storyactTitle}
                story={storylineOcurrencies}
                type={storylineType}

                previousBtn = {() => prevStoryBtn()}

                nextBtn = {() => showStoryline()}
            />
            <WinnerSegment
                visible={showWinnerPresentation}
                winner={winner}
            />
        </>
    );
}

export default HungerGamesPage;