import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Icon, Modal, Image, Input, Form, Divider } from 'semantic-ui-react';

const ModalFortniteOutfitSelector = (props) => {

    let [nome, setNome] = useState("");
    let [outfits, setOutfits] = useState([]);

    useEffect(() => {
        carregaOutfits();
    }, [nome]);

    const carregaOutfits = () => {
        axios.get("https://fortnite-api.com/v2/cosmetics/br/search/all", {
            params: {
                type: "outfit", 
                language: "pt-BR",
                searchLanguage: "pt-BR",
                matchMethod: "contains",
                hasFeaturedImage: "true",
                name: nome
            }
        })
        .then((response) => {
            let resultados = response.data.data;

            let fotosOutfits = [];
            resultados.forEach(outfit => {
                fotosOutfits.push({
                    nome: outfit.name,
                    icone: outfit.images.smallIcon
                });
            });

            setOutfits(fotosOutfits);
        })
        .catch(() => {
            setOutfits([]);
        })
    }


    return(
        <Modal
            open={props.open}
            onClose={props.onClose}
            onOpen={props.onOpen}
            dimmer='blurring'
            closeIcon
        >
            <Modal.Header>
                <Icon name='male' circular/>
                Escolha uma skin para esse jogador: 
            </Modal.Header>
            <Modal.Content>
                <Form.Field>
                    <label>Digite aqui o nome da skin que você procura:</label>
                    <Form.Input 
                        placeholder='Digite aqui o nome da skin que você procura:'
                        icon='search'
                        iconPosition='left'
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        fluid
                    />
                </Form.Field>
                <Divider/>
                <p style={{textAlign: 'center'}}>
                    <Image.Group size='tiny'>
                        {
                            outfits.map(
                                (item, index) => (
                                    <Image key={"fortniteOutfit" + index} src={item.icone} title={item.nome} className='clickable' onClick={() => props.closeModalFortniteOutfit(item.icone)}/>
                                )
                            )
                        }
                    </Image.Group>
                </p>
            </Modal.Content>
        </Modal>
    );
}

export default ModalFortniteOutfitSelector;