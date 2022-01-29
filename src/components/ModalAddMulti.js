import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Modal, TextArea, Radio, Input, Popup, List } from 'semantic-ui-react';
import BasicModal from "./ModalBasic";

const ModalAddMulti = (props) => {

    let [modoSeparacao, setModoSeparacao] = useState('linha');
    let [separador, setSeparador] = useState(',');
    let [textArea, setTextArea] = useState('');

    let [separadorErro, setSeparadorErro] = useState(false);

    let [modalConfirmacaoOpen, setModalConfirmacaoOpen] = useState(false);

    let [listaJogadoresArray, setListaJogadoresArray] = useState([]);
    let [listaJogadores, setListaJogadores] = useState();

    let [playersNames, setPlayersNames] = useState('jogadores');

    useEffect(() => {
        switch (props.game) {
            case 0:
                setPlayersNames('tributos');
                break;
            case 1:
                setPlayersNames('brothers/sisters');
                break;
        
            default:
                setPlayersNames('jogadores');
                break;
        }
    }, [props.game]);

    const separaJogadores = () => {
        let separadorFinal = modoSeparacao === 'linha' ? "\n" : separador;

        if(separadorFinal !== ""){
            setSeparadorErro(false);

            let separadosArray = textArea.split(separadorFinal);

            setListaJogadoresArray(separadosArray);
            setListaJogadores(fazLista(separadosArray));
            setModalConfirmacaoOpen(true);
        } else {
            setSeparadorErro(true);
        }
    }

    const fazLista = (array) => {
        let listItems = array.map((item, index) => (
            <List.Item as='li' key={'list' + index} >{item}</List.Item>
        ));

        return <List as='ul' inverted>{listItems}</List>;
    }

    const addPlayers = () =>{
        setModalConfirmacaoOpen(false);
        setTextArea('');
        props.addMultiplePlayers(listaJogadoresArray);
    }

    let buttonAcoes =   <>
                            <Button inverted onClick={() => setModalConfirmacaoOpen(false)}>Cancelar</Button>
                            <Button inverted color="green" onClick={() => addPlayers()}>Sim, adicionar! <Icon name='arrow right'/> </Button>
                        </>;

    return(
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
                onOpen={props.onOpen}
                closeIcon
            >
                <Modal.Header>
                    <Icon name='list' circular/>
                    Adicionar vários { playersNames } de uma vez
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={() => separaJogadores()}>
                        <Form.Field>
                            <Radio
                                label='Separar nomes por linha'
                                name='modoSeparacao'
                                value='linha'
                                checked={modoSeparacao === 'linha'}
                                onChange={() => setModoSeparacao('linha')}
                            />
                        </Form.Field>
                        <Form.Field inline  error={separadorErro}>
                            <Radio
                                label='Separar nomes por: '
                                name='modoSeparacao'
                                value='outro'
                                checked={modoSeparacao === 'outro'}
                                onChange={() => setModoSeparacao('outro')}
                            />
                            <Popup 
                                disabled={!separadorErro}
                                content="Digite um separador."
                                open={separadorErro}
                                position='right center'
                                trigger={<Input style={{width: '50px'}} value={separador} onChange={(e, {value}) => setSeparador(value)} />}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea placeholder={'Adicione aqui o nome dos ' + playersNames} value={textArea} onChange={(e, {value}) => setTextArea(value) }/>
                        </Form.Field>
                        <Form.Field disabled={textArea === ""}>
                            <Button primary fluid> <Icon name='add' />Adicionar todos os { playersNames }</Button>
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
            <BasicModal
                open={modalConfirmacaoOpen} 
                onClose={() => setModalConfirmacaoOpen(false)}
                onOpen={() => setModalConfirmacaoOpen(true)}
                titulo={'Os seguintes ' + playersNames + ' serão adicionados:'}
                icone='list'
                texto={listaJogadores}
                acoes={buttonAcoes}
            />
        </>
    );
}

export default ModalAddMulti;