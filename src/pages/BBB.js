import { useEffect, useState } from "react";
import Rotas from "../components/Rotas";
import { useHistory } from "react-router";
import { Button, Container, Header, Icon, Image, Transition } from "semantic-ui-react";
import PlayersForm from "../components/PlayersForm";
import ModalInfo from "../components/ModalInfo";
import '../styles/BBB.css';
import '../styles/Emojis.css';
import '../styles/Animojis.css';

import BBBIntro from '../images/bbb-robos.png';
import BBBLogo from '../images/bbb-logo.png';

const BBBPage = (props) => {
    let history = useHistory();
    
    let [showIntro, setShowIntro] = useState(false);
    let [showPlayerSegment, setShowPlayerSegment] = useState(false);
    let [showPresentationName, setShowPresentationName] = useState(false);
    let [showPresentationGame, setShowPresentationGame] = useState(false);

    let [modalInfoOpen, setModalInfoOpen] = useState(false);

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
        setShowPlayerSegment(false);
        setTimeout(() => {
            props.setAppClass('black-presentation-bg');
            setShowPresentationName(true);
            setTimeout(() => {
                setShowPresentationName(false);
                setTimeout(() => {
                    setShowPresentationGame(true);
                    props.setAppClass('bbb-presentation-bg');
                }, 1000);
            }, 1500);
        }, 1000);
    }

    let hide = 0;
    let show = 3000;

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
                        <PlayersForm game={1} playerNames={props.playerNames} setPlayerNames={props.setPlayerNames} startPresentation={startPresentation} />
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
                        <Image src={BBBLogo} size='huge' centered/>
                    </span>
                </div>
            </Transition>
            <ModalInfo
                open={modalInfoOpen} 
                onClose={() => setModalInfoOpen(false)}
                onOpen={() => setModalInfoOpen(true)}
            />
        </>
    );
}

export default BBBPage;