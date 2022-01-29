import React, { useEffect, useState } from "react";
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";
import { Button, Container, Header, Icon, Image, Transition, Divider, List } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import ModalInfo from "../components/ModalInfo";
import ChiquinhaLogic from "../components/ChiquinhaLogic";
import '../styles/Chiquinha.css';
import '../styles/Emojis.css';
import '../styles/Animojis.css';

import SmileyGlitchImg from '../images/smiley-glitch.gif';
import ChiquinhaImg from '../images/chiquinha/chiquinha.jpeg';
import MorteImg from '../images/chiquinha/morte.jpg';
import ChavesChiquinhaGIF from '../images/chiquinha/chaves-chiquinha.gif';

import TrophyAnimoji from '../images/animojis/trophy.gif';

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
        if(props.type === 1) {
            setShowControls(true);
        } else {
            if(props.story.length > 1)
                setShowControls(false);
            else   
                setShowControls(true);
        }
    }, [props.story, props.type]);

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
                <Header as='h1' inverted textAlign='center' >
                    {props.title}
                </Header>
                <Divider/>
                {
                    props.type === 1
                    ?   props.story.length > 0
                        ?   <Header as='h1' inverted textAlign='center'>{props.story.length} { props.story.length === 1 ? ' pessoa foi morta pelo verdadeiro pai da Chiquinha.' : ' pessoas foram mortas pelo verdadeiro pai da Chiquinha.'} </Header>
                        :   <Header as='h1' inverted textAlign='center'>O verdadeiro pai da Chiquinha não matou ninguém hoje.</Header>
                    :   null
                }
                {
                    props.type === 1
                    ?   <List inverted size='massive'>
                            {   
                                props.story.map(
                                    (item, index) => (
                                        <List.Item key={'death' + index} ><p style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: item}}/></List.Item>
                                    )
                                )
                            }
                        </List>
                    :   <>
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
                        </>
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

const WinnerSegment = (props) => (
    <Transition visible={props.visible} animation='fade' duration={1000}>
        <div style={{width: '100%', height: '100vh'}}>
            <span className='span-grettings'>
                <Header className='header-greetings' as='h1' inverted textAlign='center' >
                    <img src={TrophyAnimoji} className="animoji trophy" alt="trophy" /><br/>
                    <b style={{textTransform: 'uppercase'}}>{props.winner}</b>
                    <Header.Subheader>
                        É O VERDADEIRO PAI DA CHIQUINHA!
                    </Header.Subheader>
                </Header>
            </span>
        </div>
    </Transition>
);


const ChiquinhaPage = (props) => {
    let history = useHistory();
    
    let [showPlayerSegment, setShowPlayerSegment] = useState(true);
    let [showPresentationName, setShowPresentationName] = useState(false);
    let [showPresentationGame, setShowPresentationGame] = useState(false);

    let [modalInfoOpen, setModalInfoOpen] = useState(false);

    let [winner, setWinner] = useState('');

    let [storyline, setStoryline] = useState();

    let [storyactTitle, setStoryactTitle] = useState('');
    let [storyactDescription, setStoryactDescription] = useState(null);
    let [storyactImage, setStoryactImage] = useState();

    let [storylineOcurrencies, setStorylineOcurrencies] = useState([]);
    let [storylineType, setStorylineType] = useState(0);

    let [showStoryactPresentation, setShowStoryactPresentation] = useState(false);
    let [showStorylinePresentation, setShowStorylinePresentation] = useState(false);
    let [showWinnerPresentation, setShowWinnerPresentation] = useState(false);

    let [index, setIndex] = useState(0);

    useEffect(() => {
        props.setAppClass('black-presentation-bg');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.title = "Sorteio de " + props.nome + " - ???";
    }, [props.nome]);

    const homePage = () => {
        document.title = "Sorteio de " + props.nome;
        history.push(Rotas.base);
    }

    let startPresentation = () => {

        let story = {};
        let winner = [];
        while(winner.length === 0) {
            story = ChiquinhaLogic.generateGame(props.playerNames.val);
            winner = story.winner;
        }
        
        setStoryline(story);
        console.log(story);

        setShowPlayerSegment(false);
        setTimeout(() => {
            props.setAppClass('chiquinha-presentation-bg');
            setShowPresentationName(true);
            setTimeout(() => {
                setShowPresentationName(false);
                setTimeout(() => {
                    setShowPresentationGame(true);
                    setTimeout(() => {
                        setShowPresentationGame(false);
                        setTimeout(() => {
                            firstStory();
                        }, 100);
                    }, 5000);
                }, 1000);
            }, 1500);
        }, 1000);
    }

    const firstStory = () => {
        props.setAppClass('chiquinha-storyact-bg');

        setStoryactImage(ChiquinhaImg);
        setStoryactTitle('1º DIA');
        setStoryactDescription('Chiquinha está desesperada a procura de seu pai!');
        setShowStoryactPresentation(true);
    }

    const showStoryline = (index, presentation) => {
        if(index < storyline.story.length){
            let type = storyline.story[index].type;
            if(presentation) {
                if (type === 1) {
                    setStoryactImage(ChiquinhaImg);
                    setStoryactTitle(storyline.story[index].day + 'º DIA');
                    setStoryactDescription('Chiquinha está desesperada a procura de seu pai!');
                } else {
                    setStoryactImage(MorteImg);
                    setStoryactTitle('MORTES');
                    setStoryactDescription(null);
                }

                setShowStoryactPresentation(true);
            } else {
                if (type === 1) {
                    setTimeout(() => {
                        setStorylineOcurrencies(storyline.story[index].occurrencies);
                        setStorylineType(0);
                    }, 900);
                } else {
                    setTimeout(() => {
                        setStorylineOcurrencies(storyline.story[index].deaths);
                        setStorylineType(1);
                    }, 900);
                }

                setShowStorylinePresentation(true);
            }
        } else {
            // WINNER
            setWinner(storyline.winner);
            setShowWinnerPresentation(true);
        }
    }

    return(<div className={showPlayerSegment ? "chiquinha-players-div" : null}>
            <Button className='corner-btn' circular basic inverted icon='home' onClick={() => homePage()} />
            <Button className='corner-right-btn' circular basic inverted icon='info' onClick={() => setModalInfoOpen(true)} />
            <Transition visible={showPlayerSegment} animation='fade up' duration={1000}>
                <div>
                    <Container>
                        <br/>
                        <br/>
                        <Image src={SmileyGlitchImg} size='small' centered/>
                        <Header as='h1' inverted textAlign='center' >
                            Por: <b>{props.nome}</b>
                        </Header>
                        <PlayersForm game={2} emojis={props.emojis} playerNames={props.playerNames} setPlayerNames={props.setPlayerNames} startPresentation={startPresentation} />
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
            <Transition visible={showPresentationGame} animation='fade'>
                <div style={{width: '100%', height: '100vh'}}>
                    <span className='span-grettings'>
                        <Image src={ChavesChiquinhaGIF} size='large' centered rounded/>
                    </span>
                </div>
            </Transition>
            <ActPresentation 
                visible={showStoryactPresentation} 
                animation='fade' 
                image={storyactImage} 
                size='big' 
                title={storyactTitle}
                description={storyactDescription}

                previousBtn={() => {
                    setShowStoryactPresentation(false);
                    setTimeout(() => {
                        if(index === 0) {
                            setShowPlayerSegment(true);
                        } else {
                            let newIndex = index-1;
                            setIndex(index-1);
                            showStoryline(newIndex, false);
                        }
                    }, 100);
                }}
                nextBtn = {() => {
                    setShowStoryactPresentation(false);
                    setTimeout(() => {
                        showStoryline(index, false);
                    }, 100);
                }}
            />
            <StorylinePresentation
                visible={showStorylinePresentation}
                title={storyactTitle}
                story={storylineOcurrencies}
                type={storylineType}

                previousBtn = {() => {
                    setShowStorylinePresentation(false);
                    setTimeout(() => {
                        showStoryline(index, true);
                    }, 100);
                }}
                nextBtn = {() => {
                    setShowStorylinePresentation(false);
                    setTimeout(() => {
                        let newIndex = index+1;
                        setIndex(newIndex);
                        showStoryline(newIndex, true);
                    }, 100);
                }}
            />
            <WinnerSegment
                visible={showWinnerPresentation}
                winner={winner}
            />
            <ModalInfo
                open={modalInfoOpen} 
                onClose={() => setModalInfoOpen(false)}
                onOpen={() => setModalInfoOpen(true)}
            />
        </div>
    );
}

export default ChiquinhaPage;