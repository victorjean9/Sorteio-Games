
import { useEffect, useState } from "react";
import { Button, Divider, Header, Icon, Input } from "semantic-ui-react";
import BasicModal from "./ModalBasic";


const PlayersForm = (props) => {

    let [modalBasicOpen, setModalBasicOpen] = useState(false);
    let [modalBasicErrorOpen, setModalBasicErrorOpen] = useState(false);

    let [modalBasicErrorTitle, setModalBasicErrorTitle] = useState('');
    let [modalBasicErrorText, setModalBasicErrorText] = useState('');

    useEffect(() => {
        if(props.playerNames.val.length === 0)
            addNewPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addNewPlayer = () => {
        props.setPlayerNames({ val: [...props.playerNames.val, '']});

        sessionStorage.setItem('playersList', JSON.stringify({ val: [...props.playerNames.val, '']}));
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
            if(props.playerNames.val.length >= 10){
                setModalBasicOpen(true);
            }else{
                setModalBasicErrorTitle(props.game === 0 ? 'Você necessita de mais tributos!' : 'Você necessita de mais jogadores!');
                setModalBasicErrorText(props.game === 0 ? 'Deve haver no mínimo 10 tributos.' : 'Deve haver no mínimo 10 jogadores.');
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
                <Button fluid inverted basic onClick={() => addNewPlayer()}><Icon name='plus' /> Adicionar mais um {props.game === 0 ? 'tributo' : 'jogador'}</Button>
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
        </div>
    );
}

export default PlayersForm;