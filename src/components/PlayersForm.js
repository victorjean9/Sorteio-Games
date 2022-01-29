
import { useEffect, useState } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Input } from "semantic-ui-react";
import ModalAddMulti from "./ModalAddMulti";
import BasicModal from "./ModalBasic";
import ModalEmojiSelector from "./ModalEmojiSelector";


const PlayersForm = (props) => {
    let [modalAddMultiOpen, setModalAddMultiOpen] = useState(false);
    let [modalEmojiSelectorOpen, setModalEmojiSelectorOpen] = useState(false);

    let [modalBasicOpen, setModalBasicOpen] = useState(false);
    let [modalBasicErrorOpen, setModalBasicErrorOpen] = useState(false);

    let [modalBasicErrorTitle, setModalBasicErrorTitle] = useState('');
    let [modalBasicErrorText, setModalBasicErrorText] = useState('');

    let [playerName, setPlayerName] = useState('jogador');
    let [playersNames, setPlayersNames] = useState('jogadores');

    let [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);

    useEffect(() => {
        if(props.playerNames.val.length === 0)
            addNewPlayer('', null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        switch (props.game) {
            case 0:
                setPlayerName('tributo');
                setPlayersNames('tributos');
                break;
            case 1:
                setPlayerName('brother/sister');
                setPlayersNames('brothers/sisters');
                break;
        
            default:
                setPlayerName('jogador');
                setPlayersNames('jogadores');
                break;
        }
    }, [props.game]);

    const addNewPlayer = (nome, emoji) => {
        let emojiEscolhido = emoji;
        if(emoji === null){
            emojiEscolhido = Math.floor(Math.random() * props.emojis.length);
        }

        props.setPlayerNames({ val: [...props.playerNames.val, nome], emojis: [...props.playerNames.emojis, emojiEscolhido]});

        sessionStorage.setItem('playersList', JSON.stringify({ val: [...props.playerNames.val, nome], emojis: [...props.playerNames.emojis, emojiEscolhido]}));
    }

    const addMultiplePlayers = (list) => {
        setModalAddMultiOpen(false);

        let emojisArr = [];
        let listIndex = 0;
        while (listIndex < list.length) {
            emojisArr.push(Math.floor(Math.random() * props.emojis.length));
            listIndex++;
        }

        if(props.playerNames.val.length === 1 && props.playerNames.val[0] === ''){
            props.setPlayerNames({ val: [...list], emojis: [...emojisArr]});
            sessionStorage.setItem('playersList', JSON.stringify({ val: [...list], emojis: [...emojisArr]}));
        } else {
            props.setPlayerNames({ val: [...props.playerNames.val, ...list], emojis: [...props.playerNames.emojis, ...emojisArr]});
            sessionStorage.setItem('playersList', JSON.stringify({ val: [...props.playerNames.val, ...list], emojis: [...props.playerNames.emojis, ...emojisArr]}));
        }
    }

    function handleChange(event) {
        let vals = [...props.playerNames.val];
        let emojisArr = [...props.playerNames.emojis];

        vals[this] = event.target.value;

        props.setPlayerNames({ val: vals, emojis: emojisArr });

        sessionStorage.setItem('playersList', JSON.stringify({ val: vals, emojis: emojisArr }));
    }

    const deletePlayer = (i) => {
        let vals = [...props.playerNames.val];
        let emojisArr = [...props.playerNames.emojis];
    
        vals.splice(i, 1);
        emojisArr.splice(i, 1);

        props.setPlayerNames({ val: vals, emojis: emojisArr });

        sessionStorage.setItem('playersList', JSON.stringify({ val: vals, emojis: emojisArr }));
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
                setModalBasicErrorTitle('Você necessita de pelo menos um ' + playerName + '!');
                setModalBasicErrorText('Deve haver no mínimo um ' + playerName + '.');
                setModalBasicErrorOpen(true);
            }
        }
    } 

    const openModalEmoji = (player) => {
        setSelectedPlayerIndex(player);
        setModalEmojiSelectorOpen(true);
    }

    const closeModalEmoji = (emoji) => {
        let vals = [...props.playerNames.val];
        let emojisArr = [...props.playerNames.emojis];

        emojisArr[selectedPlayerIndex] = emoji;

        props.setPlayerNames({ val: vals, emojis: emojisArr });
        sessionStorage.setItem('playersList', JSON.stringify({ val: vals, emojis: emojisArr }));

        setModalEmojiSelectorOpen(false);
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
            <Header inverted>Adicione os { playersNames }:</Header>
            <Divider />
            <div className='players-pool'>
                {   props.playerNames.val.map(
                        (item, index) => {
                            let icon = <Icon className='input-circular-btn' name='trash' circular link onClick={() => deletePlayer(index)}/>;
                            let action = null;
                            if(props.game === 1) {
                                icon = null;
                                action = <div className='input-emoji'>
                                            <Button.Group basic inverted size="small">
                                                <Button className="button-emoji" onClick={() => openModalEmoji(index)}>
                                                    <Image src={props.emojis[props.playerNames.emojis[index]]} className="button-emoji-icon"/>
                                                </Button>
                                                <Button icon='trash' onClick={() => deletePlayer(index)}/>
                                            </Button.Group>
                                        </div>;
                            }

                            return (
                                <Input 
                                    key={'player-' + index}
                                    label={'#' + (index+1)} 
                                    placeholder={'Digite o nome do ' + playerName}
                                    className='input-bordered'
                                    size='big' 
                                    value={item||''} onChange={handleChange.bind(index)}
                                    icon={icon} 
                                    transparent 
                                    fluid 
                                    action={action}
                                />
                            );
                        }
                    )
                }
                <br/>
                <Grid columns='equal'>
                    <Grid.Column>
                        <Button inverted basic fluid onClick={() => addNewPlayer('', null)}><Icon name='plus' /> Adicionar mais um { playerName }</Button>
                    </Grid.Column>
                    <Grid.Column >
                        <Button inverted basic fluid onClick={() => setModalAddMultiOpen(true)}><Icon name='list' /> Adicionar vários { playersNames }</Button>
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
            <ModalEmojiSelector 
                open={modalEmojiSelectorOpen} 
                onClose={() => setModalEmojiSelectorOpen(false)}
                onOpen={() => setModalEmojiSelectorOpen(true)}

                emojis={props.emojis}
                closeModalEmoji={closeModalEmoji}
            />
        </div>
    );
}

export default PlayersForm;