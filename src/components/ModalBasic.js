import React from 'react';
import { Icon, Modal, Header } from 'semantic-ui-react';

const BasicModal = (props) => {

    return(
        <Modal
            basic
            open={props.open}
            onClose={props.onClose}
            onOpen={props.onOpen}
            size='mini'
            dimmer='blurring'
        >
            <Header icon>
                <Icon name={props.icone} />
                {props.titulo}
            </Header>
            <Modal.Content>
                {props.texto}
            </Modal.Content>
            <Modal.Actions>
                {props.acoes}
            </Modal.Actions>
        </Modal>
    );
}

export default BasicModal;