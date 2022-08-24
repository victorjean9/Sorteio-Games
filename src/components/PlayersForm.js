
import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Input } from "semantic-ui-react";
import Games from "./Games";
import ModalAddMulti from "./ModalAddMulti";
import BasicModal from "./ModalBasic";
import ModalEmojiSelector from "./ModalEmojiSelector";
import ModalFortniteOutfitSelector from "./ModalFortniteOutfitSelector";


const PlayersForm = (props) => {
    let [modalAddMultiOpen, setModalAddMultiOpen] = useState(false);
    let [modalEmojiSelectorOpen, setModalEmojiSelectorOpen] = useState(false);
    let [modalFortniteOutfitSelectorOpen, setModalFortniteOutfitSelectorOpen] = useState(false);

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
            case Games.hungerGames:
                setPlayerName('tributo');
                setPlayersNames('tributos');
                break;
            case Games.bigBrotherBrasil:
                setPlayerName('brother/sister');
                setPlayersNames('brothers/sisters');
                break;
        
            default:
                setPlayerName('jogador');
                setPlayersNames('jogadores');
                break;
        }
    }, [props.game]);

    const pegaOutfitFortniteAleatorio = () => {
        let index = Math.floor(Math.random() * props.fortniteOutfits.length);
        return props.fortniteOutfits[index];
    }

    const addNewPlayer = (nome, emoji) => {
        let emojiEscolhido = emoji;
        if(emoji === null){
            emojiEscolhido = Math.floor(Math.random() * props.emojis.length);
        }

        props.setPlayerNames({ 
            val: [...props.playerNames.val, nome], 
            emojis: [...props.playerNames.emojis, emojiEscolhido],
            fortniteOutfit: [...props.playerNames.fortniteOutfit, pegaOutfitFortniteAleatorio()]
        });

        sessionStorage.setItem('playersList', JSON.stringify({ 
            val: [...props.playerNames.val, nome], 
            emojis: [...props.playerNames.emojis, emojiEscolhido],
            fortniteOutfit: [...props.playerNames.fortniteOutfit, pegaOutfitFortniteAleatorio()]
        }));
    }

    const addMultiplePlayers = (list) => {
        setModalAddMultiOpen(false);

        let emojisArr = [];
        let fortniteOutfitArr = [];
        let listIndex = 0;
        while (listIndex < list.length) {
            emojisArr.push(Math.floor(Math.random() * props.emojis.length));
            fortniteOutfitArr.push(pegaOutfitFortniteAleatorio());
            listIndex++;
        }

        if(props.playerNames.val.length === 1 && props.playerNames.val[0] === ''){
            props.setPlayerNames({ 
                val: [...list], 
                emojis: [...emojisArr],
                fortniteOutfit: [...fortniteOutfitArr]
            });
            sessionStorage.setItem('playersList', JSON.stringify({ 
                val: [...list], 
                emojis: [...emojisArr],
                fortniteOutfit: [...fortniteOutfitArr]
            }));
        } else {
            props.setPlayerNames({ 
                val: [...props.playerNames.val, ...list], 
                emojis: [...props.playerNames.emojis, ...emojisArr],
                fortniteOutfit: [...props.playerNames.fortniteOutfit, ...fortniteOutfitArr]
            });
            sessionStorage.setItem('playersList', JSON.stringify({ 
                val: [...props.playerNames.val, ...list], 
                emojis: [...props.playerNames.emojis, ...emojisArr],
                fortniteOutfit: [...props.playerNames.fortniteOutfit, ...fortniteOutfitArr]
            }));
        }
    }

    function handleChange(event) {
        let vals = [...props.playerNames.val];
        let emojisArr = [...props.playerNames.emojis];
        let fortniteOutfitArr = [...props.playerNames.fortniteOutfit];

        vals[this] = event.target.value;

        props.setPlayerNames({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr });

        sessionStorage.setItem('playersList', JSON.stringify({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr }));
    }

    const deletePlayer = (i) => {
        let vals = [...props.playerNames.val];
        let emojisArr = [...props.playerNames.emojis];
        let fortniteOutfitArr = [...props.playerNames.fortniteOutfit];
    
        vals.splice(i, 1);
        emojisArr.splice(i, 1);
        fortniteOutfitArr.splice(i, 1);

        props.setPlayerNames({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr });

        sessionStorage.setItem('playersList', JSON.stringify({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr }));
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

    const openModalFortniteOutfit = (player) => {
        setSelectedPlayerIndex(player);
        setModalFortniteOutfitSelectorOpen(true);
    }

    const closeModalEmoji = (emoji) => {
        let vals = [...props.playerNames.val];
        let emojisArr = [...props.playerNames.emojis];
        let fortniteOutfitArr = [...props.playerNames.fortniteOutfit];

        emojisArr[selectedPlayerIndex] = emoji;

        props.setPlayerNames({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr });
        sessionStorage.setItem('playersList', JSON.stringify({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr }));

        setModalEmojiSelectorOpen(false);
    }

    const closeModalFortniteOutfit = (outfitUrl) => {
        let vals = [...props.playerNames.val];
        let emojisArr = [...props.playerNames.emojis];
        let fortniteOutfitArr = [...props.playerNames.fortniteOutfit];

        fortniteOutfitArr[selectedPlayerIndex] = outfitUrl;

        props.setPlayerNames({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr });
        sessionStorage.setItem('playersList', JSON.stringify({ val: vals, emojis: emojisArr, fortniteOutfit: fortniteOutfitArr }));

        setModalFortniteOutfitSelectorOpen(false);
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
                            if(props.game === Games.bigBrotherBrasil) {
                                icon = null;
                                action = <div className='input-emoji'>
                                            <Button.Group basic inverted size="small">
                                                <Button className="button-emoji" onClick={() => openModalEmoji(index)}>
                                                    <Image src={props.emojis[props.playerNames.emojis[index]]} className="button-emoji-icon"/>
                                                </Button>
                                                <Button icon='trash' onClick={() => deletePlayer(index)}/>
                                            </Button.Group>
                                        </div>;
                            } else if(props.game === Games.fortnite) {
                                icon = null;
                                action = <div className='input-fortnite-skin'>
                                            <Button.Group basic inverted size="small">
                                                <Button className="button-fortnite-outfit" onClick={() => openModalFortniteOutfit(index)}>
                                                    {
                                                        props.playerNames.fortniteOutfit[index] !== ""
                                                        ?   <Image src={props.playerNames.fortniteOutfit[index]} size='mini' className="button-fortnite-outfit-icon"/>
                                                        :   <Icon name='circle notch' loading/>
                                                    }
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
                                    className={props.game === Games.fortnite ? 'input-bordered grande' : 'input-bordered'}
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
            <ModalFortniteOutfitSelector
                open={modalFortniteOutfitSelectorOpen} 
                onClose={() => setModalFortniteOutfitSelectorOpen(false)}
                onOpen={() => setModalFortniteOutfitSelectorOpen(true)}
                closeModalFortniteOutfit={closeModalFortniteOutfit}
            />
        </div>
    );
}

export default PlayersForm;