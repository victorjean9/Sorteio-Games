import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import '../styles/Animojis.css';

import SparklingHeartAnimoji from '../images/animojis/sparkling_heart.gif';
import { Link } from 'react-router-dom';
import Rotas from './Rotas';

const ModalInfo = (props) => {
    return(
        <Modal
            open={props.open}
            onClose={props.onClose}
            onOpen={props.onOpen}
            size='mini'
            dimmer='blurring'
            closeIcon
        >
            <Modal.Header>
                <Icon name='info' circular/>
                Sobre esse site
            </Modal.Header>
            <Modal.Content>
                <p style={{textAlign: 'center'}}>
                    Inspirado e baseado no site: <a href='https://brantsteele.net/hungergames/' target='_new'>BrantSteele</a>.<br/><br/>
                    Emojis fornecidos por: <a href='https://www.joypixels.com/' target='_new'>JoyPixels</a>.<br/><br/>
                    Feito com <Link to={Rotas.chiquinha}><img src={SparklingHeartAnimoji} className='animoji sparkling-heart' alt='sparkling heart'/></Link> por Victor Jean.
                    <Button as='a' href='https://twitter.com/victorjean9' target='_new' color='twitter'>
                        <Icon name='twitter' />
                        Me siga no Twitter
                    </Button>
                    <br/>
                    <br/>
                    Ajude para que esse site continue online:<br/>
                    <Button as='a' href='https://www.paypal.com/donate?business=JG9BVP5EHQ5UJ&no_recurring=0&currency_code=BRL' target='_new' color='facebook'>
                        <Icon name='paypal' />
                        Doar
                    </Button>
                </p>
            </Modal.Content>
        </Modal>
    );
}

export default ModalInfo;