
import { useEffect, useState } from "react";
import { Button, Divider, Grid, Header, Icon, Input } from "semantic-ui-react";
import ModalAddMulti from "./ModalAddMulti";
import BasicModal from "./ModalBasic";


const PlayersForm = (props) => {

    let [modalAddMultiOpen, setModalAddMultiOpen] = useState(false);

    let [modalBasicOpen, setModalBasicOpen] = useState(false);
    let [modalBasicErrorOpen, setModalBasicErrorOpen] = useState(false);

    let [modalBasicErrorTitle, setModalBasicErrorTitle] = useState('');
    let [modalBasicErrorText, setModalBasicErrorText] = useState('');

    useEffect(() => {
        if(props.playerNames.val.length === 0)
            addNewPlayer('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addNewPlayer = (nome) => {
        props.setPlayerNames({ val: [...props.playerNames.val, nome]});

        sessionStorage.setItem('playersList', JSON.stringify({ val: [...props.playerNames.val, nome]}));
    }

    const addMultiplePlayers = (list) => {
        setModalAddMultiOpen(false);

        if(props.playerNames.val.length === 1 && props.playerNames.val[0] === ''){
            props.setPlayerNames({ val: [...list]});
            sessionStorage.setItem('playersList', JSON.stringify({ val: [...list]}));
        } else {
            props.setPlayerNames({ val: [...props.playerNames.val, ...list]});
            sessionStorage.setItem('playersList', JSON.stringify({ val: [...props.playerNames.val, ...list]}));
        }
    }

    function handleChange(event) {
        let vals = [...props.playerNames.val];
        vals[this] = event.target.value;
        props.setPlayerNames({ val: vals });

        sessionStorage.setItem('playersList', JSON.stringify({ val: vals }));
    }

    const deletePlayer = (i) => {
        let vals = [...props.playerNames.val];
        vals.splice(i, 1);
        props.setPlayerNames({ val: vals });

        sessionStorage.setItem('playersList', JSON.stringify({ val: vals }));
    }

    const verifyPlayers = () => {

        let haveBlankSpace = false;

        props.playerNames.val.forEach(element => {
            if(element === '')
                haveBlankSpace = true;
        });

        if(haveBlankSpace) {
            setModalBasicErrorTitle('Há campos em branco!');
            setModalBasicErrorText('Deleta ou escreva nos campos em branco para prosseguir!');
            setModalBasicErrorOpen(true);
        } else {
            if(props.playerNames.val.length > 0){
                setModalBasicOpen(true);
            } else {
                setModalBasicErrorTitle(props.game === 0 ? 'Você necessita de pelo menos um tributo!' : 'Você necessita de pelo menos um jogador!');
                setModalBasicErrorText(props.game === 0 ? 'Deve haver no mínimo um tributo.' : 'Deve haver no mínimo um jogador.');
                setModalBasicErrorOpen(true);
            }
        }
    } 

    const startGame = () => {
        setModalBasicOpen(false);
        props.startPresentation();
    }

    let buttonOK =   <Button inverted onClick={() => setModalBasicErrorOpen(false)}>OK</Button>

    let buttonAcoes =   <>
                            <Button inverted onClick={() => setModalBasicOpen(false)}>Cancelar</Button>
                            <Button inverted color="green" onClick={() => startGame()}>Sim, começar! <Icon name='arrow right'/> </Button>
                        </>;
    
    return (
        <div>
            <Header inverted>Adicione os { props.game === 0 ? 'tributos' : 'jogadores'}:</Header>
            <Divider />
            <div className='players-pool'>
                {   props.playerNames.val.map(
                        (item, index) => (
                            <Input 
                                key={'player-' + index}
                                label={'#' + (index+1)} 
                                placeholder={ props.game === 0 ? 'Digite o nome do tributo' : 'Digite o nome do jogador' }
                                className='input-bordered'
                                size='big' 
                                value={item||''} onChange={handleChange.bind(index)}
                                icon={ <Icon className='input-circular-btn' name='trash' circular link onClick={() => deletePlayer(index)}/> } 
                                transparent 
                                fluid 
                            />
                        )
                    )
                }
                <br/>
                <Grid columns='equal'>
                    <Grid.Column>
                        <Button inverted basic fluid onClick={() => addNewPlayer('')}><Icon name='plus' /> Adicionar mais um {props.game === 0 ? 'tributo' : 'jogador'}</Button>
                    </Grid.Column>
                    <Grid.Column >
                        <Button inverted basic fluid onClick={() => setModalAddMultiOpen(true)}><Icon name='list' /> Adicionar vários {props.game === 0 ? 'tributos' : 'jogadores'}</Button>
                    </Grid.Column>
                </Grid>
                <br/>
                <Button fluid inverted basic onClick={() => verifyPlayers()} size='massive' >COMEÇAR SORTEIO</Button>
            </div>
            <BasicModal
                open={modalBasicOpen} 
                onClose={() => setModalBasicOpen(false)}
                onOpen={() => setModalBasicOpen(true)}
                titulo='Deseja começar o sorteio?'
                icone='trophy'
                texto='Que vença o mais sortudo!'
                acoes={buttonAcoes}
            />
            <BasicModal
                open={modalBasicErrorOpen} 
                onClose={() => setModalBasicErrorOpen(false)}
                onOpen={() => setModalBasicErrorOpen(true)}
                titulo={ modalBasicErrorTitle }
                icone='exclamation triangle'
                texto={ modalBasicErrorText }
                acoes={buttonOK}
            />
            <ModalAddMulti
                open={modalAddMultiOpen} 
                onClose={() => setModalAddMultiOpen(false)}
                onOpen={() => setModalAddMultiOpen(true)}
                game={props.game}
                addMultiplePlayers={addMultiplePlayers}
            />
        </div>
    );
}

export default PlayersForm;