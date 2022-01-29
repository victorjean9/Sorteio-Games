import BBBEvents from "./BBBEvents";
import BBBType from "./BBBType";

class BBBLogic {

    escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    randomize = (total) => {
        return Math.floor(Math.random() * total);
    }

    pickOnePlayer = (playersList) => {
        if(playersList.length > 1) {
            return this.randomize(playersList.length);
        } else {
            return 0;
        }
    }

    generateGroups = (playersList) => {
        let playersLeft = [];

        playersList.val.forEach((element, index) => {
            playersLeft.push({name: element, emoji: playersList.emojis[index]});
        });

        let pipoca = [];
        let camarote = [];

        let theLastWasPipoca = false;

        while(playersLeft.length > 0){
            let indexPlayer = this.pickOnePlayer(playersLeft);
            let chosenPlayer = playersLeft[indexPlayer];

            if(!theLastWasPipoca) {
                pipoca.push(chosenPlayer);
                theLastWasPipoca = true;
            } else {
                camarote.push(chosenPlayer);
                theLastWasPipoca = false;
            }

            playersLeft.splice(indexPlayer, 1);
        }

        let groups = {pipoca: pipoca, camarote: camarote}

        return groups;
    }

    generateGame = (groupsList) => {
        console.log('entrou 0');
        let storyArray = [];

        let playersLeft = [...groupsList.pipoca, ...groupsList.camarote];

        /* 
            ---DINAMICA DA PRIMEIRA SEMANA---
            -> Muro
                -> Divide a casa em dois separando pipocas dos camarotes.
                -> Prova de imunidade imuniza todo um grupo.
            -> Segunda Casa
                -> 70% das pessoas entram. As outras 30% entram em outra casa já imunes.
            -> Pipocas entram de manhã, camarote de noite.
                -> Prova de imunidade separadas para cada grupo. Apenas 2 de cada grupo ficam imunes.
        */

        
        let week = 1;
        let imunes = [];
        let monstros = [];
        let anjo = null;
        let lider = null;
        let dinamicaEscolhida = this.randomize(3);

        storyArray.push({type: BBBType.SEMANA, week: week});
        storyArray.push({type: BBBType.DINAMICA, dynamic: dinamicaEscolhida});

        switch (dinamicaEscolhida) {
            case 0: // Muro
                // ENTRADA PIPOCAS
                let eventosEntradasPipoca = this.geraEntradaParticipantes(groupsList.pipoca, []);

                // ENTRADA CAMAROTE
                let eventosEntradasCamarote = this.geraEntradaParticipantes(groupsList.camarote, []);

                storyArray.push({type: BBBType.MUROPIPOCA, occurrencies: eventosEntradasPipoca});
                storyArray.push({type: BBBType.MUROCAMAROTE, occurrencies: eventosEntradasCamarote});
                break;
            
            case 1: // Segunda Casa

                let quantidadeImunes = Math.floor((playersLeft.length*30)/100);
                let auxQtd = 0;
                let playersLeftAux = [...playersLeft];
                while(auxQtd < quantidadeImunes){
                    let playerImune = this.pickOnePlayer(playersLeftAux);
                    imunes.push(playerImune);
                    playersLeftAux.splice(playerImune, 1);

                    auxQtd++;
                }

                let listaParticipantesCasaPrincipal = [];
                let listaParticipantesCasaSecundaria = [];
                playersLeft.forEach((element, playerIndex) => {
                    let estaImune = false;

                    imunes.forEach(imuneIndex => {
                        if(playerIndex === imuneIndex){
                            estaImune = true;
                        }
                    });

                    if(!estaImune) {
                        listaParticipantesCasaPrincipal.push(element);
                    } else {
                        listaParticipantesCasaSecundaria.push(element);
                    }
                });

                // ENTRADA NA CASA PRINCIPAL
                let eventosEntradasCasaPrincipal = this.geraEntradaParticipantes(listaParticipantesCasaPrincipal, []);

                // ENTRADA NA CASA SECUNDARIA
                let eventosEntradasCasaSecundaria = this.geraEntradaParticipantes(listaParticipantesCasaSecundaria, []);

                storyArray.push({type: BBBType.CASAPRINCIPAL, occurrencies: eventosEntradasCasaPrincipal});
                storyArray.push({type: BBBType.CASASECUNDARIA, occurrencies: eventosEntradasCasaSecundaria});
                break;
        
            default: // Pipocas entram de manhã, camarote de noite.
                // ENTRADA PIPOCAS MANHA
                let eventosEntradasPipocaManha = this.geraEntradaParticipantes(groupsList.pipoca, []);

                // ENTRADA CAMAROTE NOITE
                let eventosEntradasCamaroteNoite = this.geraEntradaParticipantes(groupsList.camarote, groupsList.pipoca);

                storyArray.push({type: BBBType.PIPOCASMANHA, occurrencies: eventosEntradasPipocaManha});
                storyArray.push({type: BBBType.CAMAROTESNOITE, occurrencies: eventosEntradasCamaroteNoite});
                break;
        }

        return({story: storyArray});
    }

    geraEntradaParticipantes = (playersLeft, playersAlreadyInside) => {
        let playersOrder = [...playersLeft];
        let playersInside = [...playersAlreadyInside];

        let storyEvents = [];

        while(playersOrder.length > 0){
            let qtdPlayers = 0;
            let eventNumber = 0;
            let event;
            do {
                eventNumber = this.randomize(BBBEvents.entradaDeParticipante.length);
                event = BBBEvents.entradaDeParticipante[eventNumber];
                qtdPlayers = event.players;
            } while (qtdPlayers > (playersInside.length + 1));

            let i = 1;
            let eventText = event.text;
            let firstPlayer = null;
            let playersInsideAux = [...playersInside];
            while(i <= qtdPlayers){
                let indexPlayer;
                let chosenPlayer;

                if(i === 1){
                    indexPlayer = this.pickOnePlayer(playersOrder);
                    chosenPlayer = playersOrder[indexPlayer];
                    
                    firstPlayer = chosenPlayer;
                    playersInside.push(chosenPlayer);
                } else {
                    indexPlayer = this.pickOnePlayer(playersInsideAux);
                    chosenPlayer = playersInsideAux[indexPlayer];
                }

                let replacerStr = '(Jogador' + i +')';
                var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(i === 1){
                    playersOrder.splice(indexPlayer, 1);
                } else {
                    playersInsideAux.splice(indexPlayer, 1);
                }

                i++;
            }

            storyEvents.push(eventText);
        }

        return storyEvents;
    }

}

export default (new BBBLogic());