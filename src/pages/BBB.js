import React, { useEffect, useRef, useState } from "react";
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";
import { Button, Container, Header, Icon, Image, Transition, Divider, Grid, List } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import ModalInfo from "../components/ModalInfo";
import '../styles/BBB.css';
import '../styles/Emojis.css';
import '../styles/Animojis.css';

import useLongPress from '../components/exported/useLongPress';

import BBBIntro from '../images/bbb-robos.png';
import BBBLogo from '../images/bbb-logo.png';
import PopcornAnimoji from '../images/animojis/popcorn.gif';
import CrownAnimoji from '../images/animojis/crown.gif';


import introVideo from '../videos/robo.webm';
import BBBLogic from "../components/BBBLogic";
import { useMediaQuery } from "react-responsive";
import BBBType from "../components/BBBType";


import muroImg from '../images/bbb/muro.jpg';
import duasCasasImg from '../images/bbb/duascasas.jpeg';
import duasEntradasImg from '../images/bbb/duasentradas.png';
import modoTurboImg from '../images/bbb/top10.png';
import finalImg from '../images/bbb/final.png';

//BANNERS
import dinamicaMuroPipocaImg from '../images/bbb/bbb-muro-pipoca.jpg';
import dinamicaMuroCamaroteImg from '../images/bbb/bbb-muro-camarote.jpg';
import dinamicaCasaPrincipalImg from '../images/bbb/bbb-casa-principal.jpg';
import dinamicaCasaSecundariaImg from '../images/bbb/bbb-casa-secundaria.jpg';
import dinamicaPipocasManhaImg from '../images/bbb/bbb-pipocas-manha.jpg';
import dinamicaCamarotesNoiteImg from '../images/bbb/bbb-camarotes-noite.jpg';

import dinamicaDialogosMuroPipocasImg from '../images/bbb/bbb-dialogos-muro-pipocas.png';
import dinamicaDialogosMuroCamarotesImg from '../images/bbb/bbb-dialogos-muro-camarotes.png';
import dinamicaDialogosCasaBBBImg from '../images/bbb/bbb-dialogos-casa-bbb.png';
import dinamicaDialogosCasaSecundariaImg from '../images/bbb/bbb-dialogos-casa-secundaria.png';
import dinamicaDialogosPipocasManhaImg from '../images/bbb/bbb-dialogos-pipocas-manha.png';
import dinamicaDialogosCamarotesNoiteImg from '../images/bbb/bbb-dialogos-camarotes-noite.png';

import dinamicaProvaImunidadeMuroImg from '../images/bbb/bbb-prova-imunidade-muro.png';
import dinamicaProvaImunidadeCasaBBBImg from '../images/bbb/bbb-prova-imunidade-casa-bbb.png';
import dinamicaProvaImunidadePipocasImg from '../images/bbb/bbb-prova-imunidade-pipocas.png';
import dinamicaProvaImunidadeCamarotesImg from '../images/bbb/bbb-prova-imunidade-camarotes.png';

import dinamicaDialogosPosProvaImunidadeImg from '../images/bbb/bbb-dialogos-pos-prova-imunidade.png';

import dinamicaFimMuroImg from '../images/bbb/bbb-fim-muro.png';
import dinamicaFimCasaSecundariaImg from '../images/bbb/bbb-fim-casa-secundaria.png';

import dinamicaFormacaoVipXepaImg from '../images/bbb/bbb-formacao-vip-xepa.png';

import dinamicaPrimeiraFestaImg from '../images/bbb/bbb-primeira-festa.png';

import dinamicaProvaDoAnjoImg from '../images/bbb/bbb-prova-do-anjo.png';
import dinamicaCastigoDoMonstroImg from '../images/bbb/bbb-castigo-do-monstro.png';
import dinamicaPresenteDoAnjoImg from '../images/bbb/bbb-presente-do-anjo.png';
import dinamicaBigFoneImg from '../images/bbb/bbb-big-fone.png';
import dinamicaDinamicaDoParedaoImg from '../images/bbb/bbb-dinamica-do-paredao.png';
import dinamicaFormacaoDeParedaoImg from '../images/bbb/bbb-formacao-de-paredao.png';
import dinamicaProvaBateVoltaImg from '../images/bbb/bbb-prova-bate-volta.png';
import dinamicaJogoDaConcordiaImg from '../images/bbb/bbb-jogo-da-concordia.png';
import dinamicaJogoDaDiscordiaImg from '../images/bbb/bbb-jogo-da-discordia.png';
import dinamicaEliminacaoImg from '../images/bbb/bbb-eliminacao.png';
import dinamicaFestaImg from '../images/bbb/bbb-festa.png';
import resumoDoDiaImg from '../images/bbb/bbb-resumo.jpg';
import provaDeSobrevivenciaImg from '../images/bbb/bbb-prova-de-sobrevivencia.jpg';
import resultadoFinalImg from '../images/bbb/bbb-resultado-final.jpg';

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

    let [diaDaSemana, setDiaDaSemana] = useState("");

    useEffect(() => {
        setStoryArray(props.story.slice(0, 1));
        if(props.story.length > 1)
            setShowControls(false);
        else   
            setShowControls(true);
    }, [props.story]);

    useEffect(() => {
        switch (props.dayOfWeek) {
            case 1: // DOMINGO
                setDiaDaSemana("DOMINGO");
                break;
            case 2: // SEGUNDA-FEIRA
                setDiaDaSemana("SEGUNDA-FEIRA");
                break;
            case 3: // TERÇA-FEIRA
                setDiaDaSemana("TERÇA-FEIRA");
                break;
            case 4: // QUARTA-FEIRA
                setDiaDaSemana("QUARTA-FEIRA");
                break;
            default: // QUINTA-FEIRA // SEXTA-FEIRA // SÁBADO
                setDiaDaSemana("QUINTA, SEXTA E SÁBADO");
                break;
        }
    }, [props.dayOfWeek]);

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

                <Image src={props.image} size='big' centered rounded/>
                <Header as='h1' inverted textAlign='center' >
                    {props.title}
                    <Header.Subheader>{diaDaSemana}</Header.Subheader>
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
                    ?   <p style={{textAlign: 'center'}}><Button inverted size='big' {...longPressEvent} basic circular icon><Icon name='angle down' /></Button></p>
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

const WinnerSegment = (props) => {
    return(
        <Transition visible={props.visible} animation='fade' duration={1000}>
            <div style={{width: '100%', height: '100vh'}}>
                <span className='span-grettings'>
                    <Header className='header-greetings' as='h1' inverted textAlign='center' >
                        <>
                            <img src={props.emojis[props.winner.emoji]} className="animoji trophy" alt="trophy" />
                            <br/>
                            <b style={{textTransform: 'uppercase'}}>{props.winner.name}</b>
                            <Header.Subheader>
                                GANHOU O SORTEIO!
                            </Header.Subheader>
                        </>
                    </Header>
                </span>
            </div>
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
    let [dayOfWeek, setDayOfWeek] = useState(2);

    let [actualWeek, setActualWeek] = useState(1);

    let [prevActBtn, setPrevActBtn ] = useState(() => {});
    let [nextActBtn, setNextActBtn ] = useState(() => {});

    let [storyline, setStoryline] = useState();
    let [groups, setGroups] = useState({pipoca: [], camarote: []});

    let [modalInfoOpen, setModalInfoOpen] = useState(false);

    // let [animationSlidingDiagonals, setAnimationSlidingDiagonals] = useState(false);
    // let [animationColorfullWaves, setAnimationColorfullWaves] = useState(false);

    let [showWinnerPresentation, setShowWinnerPresentation] = useState(false);
    let [winner, setWinner] = useState({name: "", emoji: 10});

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
        let game = BBBLogic.generateGame(groups, props.nome);

        console.log(game);
        setGroups(groups);
        setStoryline(game);

        setShowPlayerSegment(false);
        setTimeout(() => {
            props.setAppClass('black-presentation-bg');
            setShowPresentationName(true);
            setTimeout(() => {
                setShowPresentationName(false);
                setTimeout(() => {
                    setShowPresentationGame(true);
                    props.setAppClass('bbb-presentation-bg');
                    videoPlayer.current.play();
                    // startActPresentation(setShowGroupsPresentation, setShowPresentationGame, 100, 2000, null);
                    startActPresentation(setShowPresentationLogo, setShowPresentationGame, 100, 1300, 'bbb-white');
                    setTimeout(() => {
                        startActPresentation(setShowGroupsPresentation, setShowPresentationLogo, 100, 2000, 'bbb-week-presentation');
                        // setTimeout(() => {
                        //     setAnimationSlidingDiagonals(true);
                        // }, 2000);
                    }, 2000);
                }, 1000);
            }, 1500);
        }, 1000);
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
                    startActPresentation(setShowWeekPresentation, setShowGroupsList, 1000, 0, 'bbb-week-presentation');

                    setActualWeek(week);

                    setPrevActBtn(() => () => {
                        startActPresentation(setShowGroupsPresentation, setShowWeekPresentation, 1000, 0, null);
                    });
                    setNextActBtn(() => () => {
                        showStoryline(index+1);
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
                case BBBType.MODO_TURBO:
                    startActPresentation(setShowStoryactPresentation, setShowWeekPresentation, 1000, 0, 'bbb-modo-turbo');
                    setTimeout(() => {
                        setStoryactImage(modoTurboImg);
                        setStoryactTitle('RESTAM APENAS 10 PARTICIPANTES!');
                        setStoryactDescription(
                            <>A partir de agora o jogo entrará em modo turbo!<br/>Não haverá mais líderes nem anjos, apenas provas de sobrevivência.<br/>Quem der sorte ou resistir se livra do paredão.</>
                        );
                    }, 900);

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
                case BBBType.FINAL:
                    startActPresentation(setShowStoryactPresentation, setShowWeekPresentation, 1000, 0, 'bbb-final');
                    setTimeout(() => {
                        setStoryactImage(finalImg);
                        setStoryactTitle('A GRANDE FINAL CHEGOU!');
                        setStoryactDescription(
                            <>Agora o voto é para ganhar!<br/>O último paredão já está formado e quem ganhar mais votos, ganha o prêmio dessa edição.</>
                        );
                    }, 900);

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
                    break;

                case BBBType.CASAPRINCIPAL:
                case BBBType.CASASECUNDARIA:
                    setStorylineTitle(type === BBBType.CASAPRINCIPAL ? 'ENTRADA NA CASA DO BBB' : 'ENTRADA DOS IMUNIZADOS NA OUTRA CASA');
                    setStorylineImage(type === BBBType.CASAPRINCIPAL ? dinamicaCasaPrincipalImg : dinamicaCasaSecundariaImg);
                    break;

                case BBBType.PIPOCASMANHA:
                case BBBType.CAMAROTESNOITE:
                    setStorylineTitle(type === BBBType.PIPOCASMANHA ? 'ENTRADA DOS PIPOCAS PELA MANHÃ' : 'ENTRADA DOS CAMAROTES PELA NOITE');
                    setStorylineImage(type === BBBType.PIPOCASMANHA ? dinamicaPipocasManhaImg : dinamicaCamarotesNoiteImg);
                    break;
                case BBBType.DIALOGOS_MURO_PIPOCAS:
                case BBBType.DIALOGOS_MURO_CAMAROTES:
                    setStorylineTitle(type === BBBType.DIALOGOS_MURO_PIPOCAS ? 'CONVERSAS DO LADO PIPOCA DO MURO' : 'CONVERSAS DO LADO CAMAROTE DO MURO');
                    setStorylineImage(type === BBBType.DIALOGOS_MURO_PIPOCAS ? dinamicaDialogosMuroPipocasImg : dinamicaDialogosMuroCamarotesImg);
                    break;
                case BBBType.DIALOGOS_CASA_BBB:
                case BBBType.DIALOGOS_CASA_SECUNDARIA:
                    setStorylineTitle(type === BBBType.DIALOGOS_CASA_BBB ? 'CONVERSAS NA CASA DO BBB' : 'CONVERSAS DA SEGUNDA CASA');
                    setStorylineImage(type === BBBType.DIALOGOS_CASA_BBB ? dinamicaDialogosCasaBBBImg : dinamicaDialogosCasaSecundariaImg);
                    break;
                case BBBType.DIALOGOS_PIPOCAS_MANHA:
                case BBBType.DIALOGOS_CAMAROTES_NOITE:
                    setStorylineTitle(type === BBBType.DIALOGOS_PIPOCAS_MANHA ? 'CONVERSAS PELA PARTE DA MANHÃ' : 'CONVERSAS PELA PARTE DA NOITE');
                    setStorylineImage(type === BBBType.DIALOGOS_PIPOCAS_MANHA ? dinamicaDialogosPipocasManhaImg : dinamicaDialogosCamarotesNoiteImg);
                    break;
                case BBBType.PROVA_IMUNIDADE_MURO:
                    props.setAppClass("bbb-prova-imunidade-muro");
                    setStorylineTitle("PROVA DE IMUNIDADE - PIPOCAS vs CAMAROTES");
                    setStorylineImage(dinamicaProvaImunidadeMuroImg);
                    break;
                case BBBType.PROVA_IMUNIDADE_CASA_BBB:
                    props.setAppClass("bbb-prova-imunidade-casa-bbb");
                    setStorylineTitle("PROVA DE IMUNIDADE");
                    setStorylineImage(dinamicaProvaImunidadeCasaBBBImg);
                    break;
                case BBBType.PROVA_IMUNIDADE_PIPOCAS:
                    props.setAppClass("bbb-prova-imunidade-pipocas");
                    setStorylineTitle("PROVA DE IMUNIDADE PARA PIPOCAS");
                    setStorylineImage(dinamicaProvaImunidadePipocasImg);
                    break;
                case BBBType.PROVA_IMUNIDADE_CAMAROTES:
                    props.setAppClass("bbb-prova-imunidade-camarotes");
                    setStorylineTitle("PROVA DE IMUNIDADE PARA CAMAROTES");
                    setStorylineImage(dinamicaProvaImunidadeCamarotesImg);
                    break;
                case BBBType.DIALOGOS_POS_PROVA_IMUNIDADE:
                    setStorylineTitle("COMENTÁRIOS PÓS PROVA DE IMUNIDADE");
                    setStorylineImage(dinamicaDialogosPosProvaImunidadeImg);
                    break;
                    //props.setAppClass("");
                case BBBType.FIM_MURO:
                    props.setAppClass("bbb-fim-muro");
                    setStorylineTitle("O MURO QUE DIVIDE A CASA CAIU");
                    setStorylineImage(dinamicaFimMuroImg);
                    break;
                case BBBType.FIM_CASA_SECUNDARIA:
                    props.setAppClass("bbb-fim-casa-secundaria");
                    setStorylineTitle("OS PARTICIPANTES DA SEGUNDA CASA ENTRAM NA CASA DO BBB");
                    setStorylineImage(dinamicaFimCasaSecundariaImg);
                    break;
                case BBBType.RESUMO_DA_SEMANA:
                    props.setAppClass("bbb-prova-do-lider");
                    setStorylineTitle("RESUMO DA SEMANA");
                    setStorylineImage(resumoDoDiaImg);
                    break;
                case BBBType.FORMACAO_VIP_XEPA:
                    props.setAppClass("bbb-formacao-vip-xepa");
                    setStorylineTitle("FORMAÇÃO DO VIP");
                    setStorylineImage(dinamicaFormacaoVipXepaImg);
                    break;
                case BBBType.PRIMEIRA_FESTA:
                    props.setAppClass("bbb-primeira-festa");
                    setStorylineTitle("PRIMEIRA FESTA");
                    setStorylineImage(dinamicaPrimeiraFestaImg);
                    break;
                case BBBType.PROVA_DO_ANJO:
                    props.setAppClass("bbb-prova-do-anjo");
                    setStorylineTitle("PROVA DO ANJO");
                    setStorylineImage(dinamicaProvaDoAnjoImg);
                    break;
                case BBBType.CASTIGO_DO_MONSTRO:
                    props.setAppClass("bbb-castigo-do-monstro");
                    setStorylineTitle("CASTIGO DO MONSTRO");
                    setStorylineImage(dinamicaCastigoDoMonstroImg);
                    break;
                case BBBType.PRESENTE_DO_ANJO:
                    props.setAppClass("bbb-presente-do-anjo");
                    setStorylineTitle("PRESENTE DO ANJO");
                    setStorylineImage(dinamicaPresenteDoAnjoImg);
                    break;
                case BBBType.BIG_FONE:
                    props.setAppClass("bbb-big-fone");
                    setStorylineTitle("O BIG FONE TOCOU");
                    setStorylineImage(dinamicaBigFoneImg);
                    break;
                case BBBType.DINAMICA_DO_PAREDAO:
                    props.setAppClass("bbb-dinamica-do-paredao");
                    setStorylineTitle("DINÂMICA DA SEMANA");
                    setStorylineImage(dinamicaDinamicaDoParedaoImg);
                    break;
                case BBBType.FORMACAO_DE_PAREDAO:
                    props.setAppClass("bbb-formacao-de-paredao");
                    setStorylineTitle("FORMAÇÃO DE PAREDÃO");
                    setStorylineImage(dinamicaFormacaoDeParedaoImg);
                    break;
                case BBBType.PROVA_BATE_VOLTA:
                    props.setAppClass("bbb-prova-bate-volta");
                    setStorylineTitle("PROVA BATE VOLTA");
                    setStorylineImage(dinamicaProvaBateVoltaImg);
                    break;
                case BBBType.JOGO_DA_CONCORDIA:
                    props.setAppClass("bbb-jogo-da-concordia");
                    setStorylineTitle("JOGO DA CONCORDIA");
                    setStorylineImage(dinamicaJogoDaConcordiaImg);
                    break;
                case BBBType.JOGO_DA_DISCORDIA:
                    props.setAppClass("bbb-jogo-da-discordia");
                    setStorylineTitle("JOGO DA DISCÓRDIA");
                    setStorylineImage(dinamicaJogoDaDiscordiaImg);
                    break;
                case BBBType.ELIMINACAO:
                    props.setAppClass("bbb-eliminacao");
                    setStorylineTitle("ELIMINAÇÃO");
                    setStorylineImage(dinamicaEliminacaoImg);
                    break;
                case BBBType.FESTA:
                    props.setAppClass("bbb-festa");
                    setStorylineTitle("FESTA");
                    setStorylineImage(dinamicaFestaImg);
                    break;
                case BBBType.RESUMO_DO_DIA:
                    props.setAppClass("bbb-resumo");
                    setStorylineTitle("RESUMO DO DIA");
                    setStorylineImage(resumoDoDiaImg);
                    break;
                case BBBType.PROVA_DE_SOBREVIVENCIA:
                    props.setAppClass("bbb-prova-de-sobrevivencia");
                    setStorylineTitle("PROVA DE SOBREVIVÊNCIA");
                    setStorylineImage(provaDeSobrevivenciaImg);
                    break;
                case BBBType.RESULTADO_FINAL:
                    props.setAppClass("bbb-resultado-final");
                    setStorylineTitle("A GRANDE FINAL");
                    setStorylineImage(resultadoFinalImg);
                    break;
                default:
                    break;
            }

            if((type > BBBType.DINAMICA) && (type !== BBBType.MODO_TURBO) && (type !== BBBType.FINAL)) {
                setDayOfWeek(storyline.story[index].dayOfWeek);
                setStorylineOcurrencies(storyline.story[index].occurrencies);
                setShowWeekPresentation(false);
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
            }
        } else {
            // WINNER
            setWinner(storyline.winner);
            startActPresentation(setShowWinnerPresentation, setShowStorylinePresentation, 1000, 0, 'hunger-games-bg');
        }
    }

    let hide = 0;
    let show = 1000;

    let hideLogo = 1000;
    let showLogo = 0;

    return(<>
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
                    // setTimeout(() => {
                    //     setAnimationSlidingDiagonals(false);
                    // }, 1000);
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
                dayOfWeek={dayOfWeek}

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

export default BBBPage;