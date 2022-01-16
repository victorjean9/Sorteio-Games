import React from 'react';
import { Icon, Modal, Image } from 'semantic-ui-react';

const ModalEmojiSelector = (props) => {
    return(
        <Modal
            open={props.open}
            onClose={props.onClose}
            onOpen={props.onOpen}
            dimmer='blurring'
            closeIcon
        >
            <Modal.Header>
                <Icon name='smile' circular/>
                Escolha um emoji para esse brother/sister: 
            </Modal.Header>
            <Modal.Content>
                <Image.Group size='mini'>
                    {
                        props.emojis.map(
                            (item, index) => (
                                <Image key={"emoji" + index} src={item} className='clickable' onClick={() => props.closeModalEmoji(index)}/>
                            )
                        )
                    }
                </Image.Group>
            </Modal.Content>
        </Modal>
    );
}

export default ModalEmojiSelector;