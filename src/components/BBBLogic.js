import BBBEvents from "./BBBEvents";
import BBBType from "./BBBType";

class BBBLogic {

    escapeRegExp = (string) => {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    randomize = (total) => {
        return Math.floor(Math.random() * total);
    }

    shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
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
        // let emparedados = [];
        let anjo = null;
        let piorDaProvaAnjo = null;
        let vetadoDaProvaAnjo = null;
        let lider = null;
        let XEPAlist = [];
        let VIPlist = [];
        let piorDaProvaLider = null;
        let dinamicaEscolhida = this.randomize(3);
        let oBigFoneVaiTocar = false;

        // let dinamicaEscolhida = 1;

        storyArray.push({type: BBBType.SEMANA, week: week});
        storyArray.push({type: BBBType.DINAMICA, dynamic: dinamicaEscolhida});

        switch (dinamicaEscolhida) {
            case 0: // Muro

                /* SEGUNDA-FEIRA */

                // ENTRADA PIPOCAS
                let eventosEntradasPipoca = this.geraEntradaParticipantes(groupsList.pipoca, []);

                // ENTRADA CAMAROTE
                let eventosEntradasCamarote = this.geraEntradaParticipantes(groupsList.camarote, []);

                storyArray.push({type: BBBType.MUROPIPOCA, occurrencies: eventosEntradasPipoca, dayOfWeek: 2});
                storyArray.push({type: BBBType.MUROCAMAROTE, occurrencies: eventosEntradasCamarote, dayOfWeek: 2});

                // DIALOGOS DA PRIMEIRA SEMANA
                let dialogosPipoca = this.dialogosPrimeiroDia('muro', 'pipoca', groupsList.pipoca);
                let dialogosCamarote = this.dialogosPrimeiroDia('muro', 'camarote', groupsList.camarote);

                storyArray.push({type: BBBType.DIALOGOS_MURO_PIPOCAS, occurrencies: dialogosPipoca, dayOfWeek: 2});
                storyArray.push({type: BBBType.DIALOGOS_MURO_CAMAROTES, occurrencies: dialogosCamarote, dayOfWeek: 2});

                /* TERÇA-FEIRA */

                // PROVA IMUNIDADE DOS MUROS

                let provaImunidadeMuro = this.provaImunidadeMuro(groupsList);
                storyArray.push({type: BBBType.PROVA_IMUNIDADE_MURO, occurrencies: provaImunidadeMuro, dayOfWeek: 3});

                // IMUNIZA O PESSOAL VENCEDOR
                if(provaImunidadeMuro.winner === 'pipoca') {
                    imunes = [...imunes, ...groupsList.pipoca];
                } else {
                    imunes = [...imunes, ...groupsList.camarote];
                }

                // DIALOGOS PÓS PROVA

                let ganhadoresMuro = provaImunidadeMuro.winner === 'pipoca' ? groupsList.pipoca : groupsList.camarote;
                let perdedoresMuro = provaImunidadeMuro.winner === 'pipoca' ? groupsList.camarote : groupsList.pipoca;
                
                let dialogosPosProvaImunidadeMuro = this.dialogosPosProvaImunidade(ganhadoresMuro, perdedoresMuro);
                storyArray.push({type: BBBType.DIALOGOS_POS_PROVA_IMUNIDADE, occurrencies: dialogosPosProvaImunidadeMuro, dayOfWeek: 3});

                /* QUARTA-FEIRA */
                // FIM DO MURO
                let fimMuroEventos = this.fimMuro(groupsList.pipoca,  groupsList.camarote);
                storyArray.push({type: BBBType.FIM_MURO, occurrencies: fimMuroEventos, dayOfWeek: 4});
                break;
            
            case 1: // Segunda Casa

                let quantidadeImunes = Math.floor((playersLeft.length*30)/100);
                let auxQtd = 0;
                let playersLeftAux = [...playersLeft];
                while(auxQtd < quantidadeImunes){
                    let playerImune = this.pickOnePlayer(playersLeftAux);
                    imunes.push(playersLeft[playerImune]);
                    playersLeftAux.splice(playerImune, 1);

                    auxQtd++;
                }

                let listaParticipantesCasaPrincipal = [];
                let listaParticipantesCasaSecundaria = [];
                playersLeft.forEach((element, playerIndex) => {
                    let estaImune = false;

                    imunes.forEach(playerImune => {
                        if(element === playerImune){
                            estaImune = true;
                        }
                    });

                    if(!estaImune) {
                        listaParticipantesCasaPrincipal.push(element);
                    } else {
                        listaParticipantesCasaSecundaria.push(element);
                    }
                });


                /* SEGUNDA-FEIRA */

                // ENTRADA NA CASA PRINCIPAL
                let eventosEntradasCasaPrincipal = this.geraEntradaParticipantes(listaParticipantesCasaPrincipal, []);

                // ENTRADA NA CASA SECUNDARIA
                let eventosEntradasCasaSecundaria = this.geraEntradaParticipantes(listaParticipantesCasaSecundaria, []);

                storyArray.push({type: BBBType.CASAPRINCIPAL, occurrencies: eventosEntradasCasaPrincipal, dayOfWeek: 2});
                storyArray.push({type: BBBType.CASASECUNDARIA, occurrencies: eventosEntradasCasaSecundaria, dayOfWeek: 2});

                // DIALOGOS DA PRIMEIRA SEMANA
                let dialogosCasaBBB = this.dialogosPrimeiroDia('duascasas', 'casabbb', listaParticipantesCasaPrincipal);
                let dialogosCasaSecundaria = this.dialogosPrimeiroDia('duascasas', 'casasecundaria', listaParticipantesCasaSecundaria);

                storyArray.push({type: BBBType.DIALOGOS_CASA_BBB, occurrencies: dialogosCasaBBB, dayOfWeek: 2});
                storyArray.push({type: BBBType.DIALOGOS_CASA_SECUNDARIA, occurrencies: dialogosCasaSecundaria, dayOfWeek: 2});
            
                /* TERÇA-FEIRA */

                // PROVA IMUNIDADE CASA BBB
                let provaImunidade = this.provaImunidade(listaParticipantesCasaPrincipal);
                storyArray.push({type: BBBType.PROVA_IMUNIDADE_CASA_BBB, occurrencies: provaImunidade, dayOfWeek: 3});

                // IMUNIZA OS VENCEDORES
                imunes = [...imunes, ...provaImunidade.winners];

                // DIALOGOS PÓS PROVA

                let ganhadoresCasaBBB = provaImunidade.winners;
                let perdedoresCasaBBB = [...listaParticipantesCasaPrincipal];

                for (let ganharamAux = 0; ganharamAux < ganhadoresCasaBBB.length; ganharamAux++) {
                    const ganhou = ganhadoresCasaBBB[ganharamAux];
                    
                    for (let listaBBBAux = 0; listaBBBAux < perdedoresCasaBBB.length; listaBBBAux++) {
                        const casabbb = perdedoresCasaBBB[listaBBBAux];

                        if(casabbb === ganhou) {
                            perdedoresCasaBBB.splice(listaBBBAux, 1);
                            break;
                        }
                    }
                }
                
                let dialogosPosProvaImunidadeCasaBBB = this.dialogosPosProvaImunidade(ganhadoresCasaBBB, perdedoresCasaBBB);
                storyArray.push({type: BBBType.DIALOGOS_POS_PROVA_IMUNIDADE, occurrencies: dialogosPosProvaImunidadeCasaBBB, dayOfWeek: 3});

                /* QUARTA-FEIRA */

                // FIM DO SEGUNDA CASA
                let fimSegundaCasaEventos = this.fimCasaSecundaria(listaParticipantesCasaSecundaria, listaParticipantesCasaPrincipal);
                storyArray.push({type: BBBType.FIM_CASA_SECUNDARIA, occurrencies: fimSegundaCasaEventos, dayOfWeek: 4});
                break;
        
            default: // Pipocas entram de manhã, camarote de noite.

                /* TERÇA-FEIRA */

                // ENTRADA PIPOCAS MANHA
                let eventosEntradasPipocaManha = this.geraEntradaParticipantes(groupsList.pipoca, []);
                storyArray.push({type: BBBType.PIPOCASMANHA, occurrencies: eventosEntradasPipocaManha, dayOfWeek: 3});
                
                // DIALOGOS DA PRIMEIRA SEMANA - PIPOCAS
                let dialogosPipocasManha = this.dialogosPrimeiroDia('manhanoite', 'pipoca', groupsList.pipoca);
                storyArray.push({type: BBBType.DIALOGOS_PIPOCAS_MANHA, occurrencies: dialogosPipocasManha, dayOfWeek: 3});

                // ENTRADA CAMAROTE NOITE
                let eventosEntradasCamaroteNoite = this.geraEntradaParticipantes(groupsList.camarote, groupsList.pipoca);
                storyArray.push({type: BBBType.CAMAROTESNOITE, occurrencies: eventosEntradasCamaroteNoite, dayOfWeek: 3});
                
                // DIALOGOS DA PRIMEIRA SEMANA - CAMAROTES
                let dialogosCamarotesNoite = this.dialogosPrimeiroDia('manhanoite', 'camarote', groupsList);
                storyArray.push({type: BBBType.DIALOGOS_CAMAROTES_NOITE, occurrencies: dialogosCamarotesNoite, dayOfWeek: 3});


                /* QUARTA-FEIRA */

                // PROVA IMUNIDADE PIPOCAS
                let provaImunidadePipocas = this.provaImunidade(groupsList.pipoca);
                storyArray.push({type: BBBType.PROVA_IMUNIDADE_PIPOCAS, occurrencies: provaImunidadePipocas, dayOfWeek: 4});

                // PROVA IMUNIDADE CAMAROTES
                let provaImunidadeCamarotes = this.provaImunidade(groupsList.camarote);
                storyArray.push({type: BBBType.PROVA_IMUNIDADE_CAMAROTES, occurrencies: provaImunidadeCamarotes, dayOfWeek: 4});

                // IMUNIZA OS VENCEDORES
                imunes = [...imunes, ...provaImunidadePipocas.winners, ...provaImunidadeCamarotes.winners];

                // DIALOGOS PÓS PROVA
                let ganhadoresPC = [...provaImunidadePipocas.winners, ...provaImunidadeCamarotes.winners];
                let perdedoresPC = [...groupsList.pipoca, ...groupsList.camarote];

                for (let ganharamAux = 0; ganharamAux < ganhadoresPC.length; ganharamAux++) {
                    const ganhou = ganhadoresPC[ganharamAux];
                    
                    for (let listaBBBAux = 0; listaBBBAux < perdedoresPC.length; listaBBBAux++) {
                        const pessoa = perdedoresPC[listaBBBAux];

                        if(pessoa === ganhou) {
                            perdedoresPC.splice(listaBBBAux, 1);
                            break;
                        }
                    }
                }
                
                let dialogosPosProvaImunidadePC = this.dialogosPosProvaImunidade(ganhadoresPC, perdedoresPC);
                storyArray.push({type: BBBType.DIALOGOS_POS_PROVA_IMUNIDADE, occurrencies: dialogosPosProvaImunidadePC, dayOfWeek: 4});
        }

        /* QUINTA-FEIRA */

        // Dinâmica do paredao da semana
        let primeiraDinamicaDoParedao = this.dinamicaDoParedao(oBigFoneVaiTocar);
        oBigFoneVaiTocar = primeiraDinamicaDoParedao.oBigFoneVaiTocar;
        storyArray.push({type: BBBType.DINAMICA_DO_PAREDAO, occurrencies: primeiraDinamicaDoParedao, dayOfWeek: 5});

        // Prova do lider
        let primeiraProvaDoLiderEventos = this.provaDoLider(playersLeft);
        storyArray.push({type: BBBType.PROVA_DO_LIDER, occurrencies: primeiraProvaDoLiderEventos, dayOfWeek: 5});

        piorDaProvaLider = primeiraProvaDoLiderEventos.worstPlayer;
        lider = primeiraProvaDoLiderEventos.winner;

        // Formação VIP/XEPA
        let primeiraFormacaoVIP = this.formacaoVipXepa(lider, playersLeft);
        storyArray.push({type: BBBType.FORMACAO_VIP_XEPA, occurrencies: primeiraFormacaoVIP, dayOfWeek: 5});

        XEPAlist = [...primeiraFormacaoVIP.XEPAlist];
        VIPlist = [...primeiraFormacaoVIP.VIPlist];

        /* SEXTA-FEIRA */
        // Primeira festa
        let primeiraFesta = this.primeiraFesta(playersLeft);
        storyArray.push({type: BBBType.PRIMEIRA_FESTA, occurrencies: primeiraFesta, dayOfWeek: 6});

        /* SABADO */
        // Prova do anjo
        let primeiraProvaDoAnjoEventos = this.provaDoAnjo(playersLeft, lider);
        storyArray.push({type: BBBType.PROVA_DO_ANJO, occurrencies: primeiraProvaDoAnjoEventos, dayOfWeek: 7});

        anjo = primeiraProvaDoAnjoEventos.anjo;
        piorDaProvaAnjo = primeiraProvaDoAnjoEventos.piorJogador;
        vetadoDaProvaAnjo = primeiraProvaDoAnjoEventos.jogadorVetado;

        // Castigo do monstro
        let primeiroCastigoDoMonstro = this.castigoDoMonstro(playersLeft, anjo, XEPAlist, VIPlist);
        storyArray.push({type: BBBType.CASTIGO_DO_MONSTRO, occurrencies: primeiroCastigoDoMonstro, dayOfWeek: 7});

        monstros = [...primeiroCastigoDoMonstro.monstros];
        XEPAlist = [...primeiroCastigoDoMonstro.XEPAlist];
        VIPlist = [...primeiroCastigoDoMonstro.VIPlist];

        /* DOMINGO */
        // Presente do anjo

        let primeiroPresenteDoAnjo = this.presenteDoAnjo(playersLeft, anjo, lider, XEPAlist, VIPlist, piorDaProvaLider, piorDaProvaAnjo, monstros);
        storyArray.push({type: BBBType.PRESENTE_DO_ANJO, occurrencies: primeiroPresenteDoAnjo, dayOfWeek: 1});

        // BIG FONE TOCA
        if(oBigFoneVaiTocar){
            let tocarBigFoneEvent = this.tocarBigFone(playersLeft, lider, primeiraDinamicaDoParedao);
            storyArray.push({type: BBBType.BIG_FONE, occurrencies: tocarBigFoneEvent, dayOfWeek: 1});
        }

        // Monstro liberado 
        // Formação de Paredão 
        // Imunidade do anjo e votacao 
        // Dedo duro
        // Prova bate e volta

        /* SEGUNDA-FEIRA */
        // Jogo da concordia

        /* TERÇA-FEIRA */
        // Eliminação

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
            // let firstPlayer = null;
            let playersInsideAux = [...playersInside];
            while(i <= qtdPlayers){
                let indexPlayer;
                let chosenPlayer;

                if(i === 1){
                    indexPlayer = this.pickOnePlayer(playersOrder);
                    chosenPlayer = playersOrder[indexPlayer];
                    
                    // firstPlayer = chosenPlayer;
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

    dialogosPrimeiroDia = (dynamic, typePlayers, players) => {
        let playersOrder = [];
        let allPlayers = [];

        if(dynamic === 'manhanoite' && typePlayers === 'camarote') {
            playersOrder = [...players.camarote];
            allPlayers = [...players.pipoca, ...players.camarote];
        } else {
            playersOrder = [...players];
            allPlayers = [...players];
        }

        let storyEvents = [];

        let firstDayEvents = [...BBBEvents.primeiroDiaGeral];

        if(dynamic === 'muro') {
            firstDayEvents = [...firstDayEvents, ...BBBEvents.primeiroDiaMuro];
            if(typePlayers === 'pipoca') {
                firstDayEvents = [...firstDayEvents, ...BBBEvents.primeiroDiaCasaBBB, ...BBBEvents.primeiroDiaPipoca];
            } else {
                firstDayEvents = [...firstDayEvents, ...BBBEvents.primeiroDiaCamarote];
            }
        } else if (dynamic === 'duascasas') {
            if(typePlayers === 'casabbb') {
                firstDayEvents = [...firstDayEvents, ...BBBEvents.primeiroDiaCasaBBB];
            } else {
                firstDayEvents = [...firstDayEvents, ...BBBEvents.primeiroDiaSegundaCasa, ...BBBEvents.primeiroDiaSegundaCasa, ...BBBEvents.primeiroDiaSegundaCasa, ...BBBEvents.primeiroDiaSegundaCasa];
            }
        } else { // manha e noite
            if(typePlayers === 'pipoca') {
                firstDayEvents = [...firstDayEvents, ...BBBEvents.primeiroDiaCasaBBB, ...BBBEvents.primeiroDiaPipoca];
            } else {
                firstDayEvents = [...firstDayEvents, ...BBBEvents.primeiroDiaCasaBBB, ...BBBEvents.primeiroDiaCamarote];
            }
        }

        while(playersOrder.length > 0){
            let qtdPlayers = 0;
            let eventNumber = 0;
            let event;
            do {
                eventNumber = this.randomize(firstDayEvents.length);
                event = firstDayEvents[eventNumber];
                qtdPlayers = event.players;
            } while (qtdPlayers > playersOrder.length);

            let i = 1;
            let eventText = event.text;
            let playersInSentence = [...allPlayers];
            while(i <= qtdPlayers){
                let indexPlayer;
                let chosenPlayer;

                if(i === 1){
                    indexPlayer = this.pickOnePlayer(playersOrder);
                    chosenPlayer = playersOrder[indexPlayer];
                } else {
                    indexPlayer = this.pickOnePlayer(playersInSentence);
                    chosenPlayer = playersInSentence[indexPlayer];
                }

                for (let indexSentence = 0; indexSentence < playersInSentence.length; indexSentence++) {
                    if(playersInSentence[indexSentence] === chosenPlayer) {
                        playersInSentence.splice(indexSentence, 1);
                        break;
                    }
                }

                let replacerStr = '(Jogador' + i +')';
                var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(i === 1){
                    playersOrder.splice(indexPlayer, 1);
                }

                i++;
            }

            storyEvents.push(eventText);
        }

        return storyEvents;
    }

    provaImunidadeMuro = (playersGroup) => {

        let playersOrder = [];
        let qtdPipocas = playersGroup.pipoca.length;
        let qtdCamarotes = playersGroup.camarote.length;

        playersGroup.pipoca.forEach(playerPipoca => {
            playersOrder.push({name: playerPipoca.name, emoji: playerPipoca.emoji, type: 'pipoca'});
        });

        playersGroup.camarote.forEach(playerCamarote => {
            playersOrder.push({name: playerCamarote.name, emoji: playerCamarote.emoji, type: 'camarote'});
        });

        let storyEvents = [];

        let provaImunidadeIndex = this.randomize(BBBEvents.provaImunidadeMuro.length);
        let provaImunidade = BBBEvents.provaImunidadeMuro[provaImunidadeIndex];

        while(qtdPipocas > 0 && qtdCamarotes > 0){
            let qtdPlayers = 0;
            let eventNumber = 0;
            let event;
            do {
                eventNumber = this.randomize(provaImunidade.events.length);
                event = provaImunidade.events[eventNumber];
                qtdPlayers = event.players;
            } while (qtdPlayers > playersOrder.length);

            let i = 1;
            let eventText = event.text;
            let playersInSentence = [...playersOrder];
            while(i <= qtdPlayers){
                let indexPlayer;
                let chosenPlayer;

                if(i === 1){
                    indexPlayer = this.pickOnePlayer(playersOrder);
                    chosenPlayer = playersOrder[indexPlayer];

                    if(chosenPlayer.type === 'pipoca') {
                        qtdPipocas--;
                    } else {
                        qtdCamarotes--;
                    }
                } else {
                    indexPlayer = this.pickOnePlayer(playersInSentence);
                    chosenPlayer = playersInSentence[indexPlayer];
                }

                for (let indexSentence = 0; indexSentence < playersInSentence.length; indexSentence++) {
                    if(playersInSentence[indexSentence] === chosenPlayer) {
                        playersInSentence.splice(indexSentence, 1);
                        break;
                    }
                }

                let replacerStr = '(Jogador' + i +')';
                var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(i === 1){
                    playersOrder.splice(indexPlayer, 1);

                    if(chosenPlayer.type === 'pipoca') {
                        eventText = '🍿' + eventText;
                    } else {
                        eventText = '👑' + eventText;
                    }
                }

                i++;
            }

            storyEvents.push(eventText);
        }

        let winner = qtdPipocas > 0 ? 'pipoca' : 'camarote';

        return {type: provaImunidade.type, description: provaImunidade.description, events: storyEvents, winner: winner };
    }

    provaImunidade = (players) => {

        let playersOrder = [...players];

        let storyEvents = [];

        let provaImunidadeIndex = this.randomize(BBBEvents.provaImunidade.length);
        let provaImunidade = BBBEvents.provaImunidade[provaImunidadeIndex];

        while(playersOrder.length > 2){
            let qtdPlayers = 0;
            let eventNumber = 0;
            let event;
            do {
                eventNumber = this.randomize(provaImunidade.events.length);
                event = provaImunidade.events[eventNumber];
                qtdPlayers = event.players;
            } while (qtdPlayers > playersOrder.length);

            let i = 1;
            let eventText = event.text;
            let playersInSentence = [...playersOrder];
            while(i <= qtdPlayers){
                let indexPlayer;
                let chosenPlayer;

                if(i === 1){
                    indexPlayer = this.pickOnePlayer(playersOrder);
                    chosenPlayer = playersOrder[indexPlayer];
                } else {
                    indexPlayer = this.pickOnePlayer(playersInSentence);
                    chosenPlayer = playersInSentence[indexPlayer];
                }

                for (let indexSentence = 0; indexSentence < playersInSentence.length; indexSentence++) {
                    if(playersInSentence[indexSentence] === chosenPlayer) {
                        playersInSentence.splice(indexSentence, 1);
                        break;
                    }
                }

                let replacerStr = '(Jogador' + i +')';
                var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(i === 1){
                    playersOrder.splice(indexPlayer, 1);
                }

                i++;
            }

            storyEvents.push(eventText);
        }

        return {type: provaImunidade.type, description: provaImunidade.description, events: storyEvents, winners: playersOrder };
    }

    dialogosPosProvaImunidade = (playersGanhadores, playersPerdedores) => {
        let playersGanhadoresOrder = [...playersGanhadores];
        let playersPerdedoresOrder = [...playersPerdedores];

        let storyEvents = [];

        while(playersGanhadoresOrder.length > 0 || playersPerdedoresOrder.length > 0){

            let typePlayer;
            if(playersGanhadoresOrder.length > 0 && playersPerdedoresOrder.length > 0) {
                typePlayer = this.randomize(2) === 0 ? 'ganhador' : 'perdedor';
            } else {
                typePlayer = playersGanhadoresOrder.length > 0 ? 'ganhador' : 'perdedor';
            }

            let qtdPlayers = 0;
            let eventNumber = 0;
            let event;

            let sentenca = typePlayer === 'ganhador' ? playersGanhadoresOrder.length : playersPerdedoresOrder.length;

            do {
                eventNumber = this.randomize( typePlayer === 'ganhador' ? BBBEvents.dialogosAposProvaImunidade.imunes.length : BBBEvents.dialogosAposProvaImunidade.naoImunes.length);
                event = typePlayer === 'ganhador' ? BBBEvents.dialogosAposProvaImunidade.imunes[eventNumber] : BBBEvents.dialogosAposProvaImunidade.naoImunes[eventNumber];
                qtdPlayers = event.players;
            } while (qtdPlayers > sentenca);

            let i = 1;
            let eventText = event.text;
            let playersGanhadoresInSentence = [...playersGanhadoresOrder];
            let playersPerdedoresInSentence = [...playersPerdedoresOrder];

            while(i <= qtdPlayers){
                let indexPlayer;
                let chosenPlayer;

                if(typePlayer === 'ganhador'){
                    if(i === 1){
                        indexPlayer = this.pickOnePlayer(playersGanhadoresOrder);
                        chosenPlayer = playersGanhadoresOrder[indexPlayer];
                    } else {
                        indexPlayer = this.pickOnePlayer(playersGanhadoresInSentence);
                        chosenPlayer = playersGanhadoresInSentence[indexPlayer];
                    }
                    for (let indexSentence = 0; indexSentence < playersGanhadoresInSentence.length; indexSentence++) {
                        if(playersGanhadoresInSentence[indexSentence] === chosenPlayer) {
                            playersGanhadoresInSentence.splice(indexSentence, 1);
                            break;
                        }
                    }
                } else {
                    if(i === 1){
                        indexPlayer = this.pickOnePlayer(playersPerdedoresOrder);
                        chosenPlayer = playersPerdedoresOrder[indexPlayer];
                    } else {
                        indexPlayer = this.pickOnePlayer(playersPerdedoresInSentence);
                        chosenPlayer = playersPerdedoresInSentence[indexPlayer];
                    }
                    for (let indexSentence = 0; indexSentence < playersPerdedoresInSentence.length; indexSentence++) {
                        if(playersPerdedoresInSentence[indexSentence] === chosenPlayer) {
                            playersPerdedoresInSentence.splice(indexSentence, 1);
                            break;
                        }
                    }
                }

                let replacerStr = '(Jogador' + i +')';
                var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(i === 1){
                    if(typePlayer === 'ganhador'){
                        eventText = '🏆' + eventText;

                        playersGanhadoresOrder.splice(indexPlayer, 1);
                    } else {
                        playersPerdedoresOrder.splice(indexPlayer, 1);
                    }
                }

                i++;
            }

            storyEvents.push(eventText);
        }
        
        return storyEvents;
    }

    fimMuro = (pipocas, camarotes) => {
        let pipocasLeft = [...pipocas];
        let camarotesLeft = [...camarotes];

        let storyEvents = [];

        while(pipocasLeft.length > 0 || camarotesLeft.length > 0){
            let qtdPlayers = 1;
            let eventNumber = 0;
            let event;

            if(pipocasLeft.length === 0) {
                qtdPlayers = 1;
                eventNumber = 0;
                event = BBBEvents.fimMuro[eventNumber];
                qtdPlayers = event.players;
            } else if ( camarotesLeft.length === 0 ) {
                qtdPlayers = 1;
                eventNumber = 0;
                event = BBBEvents.fimMuro[eventNumber];
                qtdPlayers = event.players;
            } else {
                do {
                    eventNumber = this.randomize(BBBEvents.fimMuro.length);
                    event = BBBEvents.fimMuro[eventNumber];
                    qtdPlayers = event.players;
                } while (qtdPlayers > camarotesLeft.length);
            }

            let i = 1;
            let eventText = event.text;
            
            while(i <= qtdPlayers){
                let indexPlayer, chosenPlayer;
                let isPipoca = true;

                if(qtdPlayers === 1) {
                    if(pipocasLeft.length === 0){
                        isPipoca = false;
                    } else if (camarotesLeft.length === 0) {
                        isPipoca = true;
                    } else {
                        let random = this.randomize(2);
                        isPipoca = random % 2 === 0;
                    }

                    indexPlayer = this.pickOnePlayer(isPipoca ? pipocasLeft : camarotesLeft);
                    chosenPlayer = isPipoca ? pipocasLeft[indexPlayer] : camarotesLeft[indexPlayer];
                } else {
                    isPipoca = i === 1;

                    indexPlayer = this.pickOnePlayer(isPipoca ? pipocasLeft : camarotesLeft);
                    chosenPlayer = isPipoca ? pipocasLeft[indexPlayer] : camarotesLeft[indexPlayer];
                }

                let replacerStr = '(Jogador' + i +')';
                var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(isPipoca) {
                    pipocasLeft.splice(indexPlayer, 1);
                } else {
                    camarotesLeft.splice(indexPlayer, 1);
                }

                i++;
            }

            storyEvents.push(eventText);
        }
        
        return storyEvents;
    }

    fimCasaSecundaria = (participantesCasaSecundaria, participantesCasaBBB) => {
        let participantesCasaSecundariaLeft = [...participantesCasaSecundaria];
        let participantesCasaBBBLeft = [...participantesCasaBBB];

        let storyEvents = [];

        while(participantesCasaSecundariaLeft.length > 0){
            let qtdPlayers = 1;
            let eventNumber = 0;
            let event;

            do {
                eventNumber = this.randomize(BBBEvents.fimSegundaCasa.participantesCasaSecundaria.length);
                event = BBBEvents.fimSegundaCasa.participantesCasaSecundaria[eventNumber];
                qtdPlayers = event.players;
            } while (qtdPlayers > (1 + participantesCasaBBBLeft.length));

            let i = 1;
            let eventText = event.text;
            
            while(i <= qtdPlayers){
                let indexPlayer, chosenPlayer;

                let isCasaSecundaria = i === 1;
                
                indexPlayer = this.pickOnePlayer(isCasaSecundaria ? participantesCasaSecundariaLeft : participantesCasaBBBLeft);
                chosenPlayer = isCasaSecundaria ? participantesCasaSecundariaLeft[indexPlayer] : participantesCasaBBBLeft[indexPlayer];

                let replacerStr = '(Jogador' + i +')';
                let regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(isCasaSecundaria) {
                    participantesCasaSecundariaLeft.splice(indexPlayer, 1);
                } else {
                    participantesCasaBBBLeft.splice(indexPlayer, 1);
                }

                i++;
            }

            storyEvents.push(eventText);
        }

        while(participantesCasaBBBLeft.length > 0){
            let qtdPlayers = 1;
            let eventNumber = 0;
            let event;

            let continua = false;

            do {
                eventNumber = this.randomize(BBBEvents.fimSegundaCasa.participantesCasaBBB.length);
                event = BBBEvents.fimSegundaCasa.participantesCasaBBB[eventNumber];
                qtdPlayers = event.players;

                if(qtdPlayers === 3) {
                    continua = (qtdPlayers - 1) > participantesCasaBBBLeft.length;
                } else {
                    continua = qtdPlayers > participantesCasaBBBLeft.length;
                }
            } while (continua);

            let i = 1;
            let eventText = event.text;
            
            while(i <= qtdPlayers){
                let indexPlayer, chosenPlayer;

                let isCasaSecundaria = i === 3;
                
                indexPlayer = this.pickOnePlayer(isCasaSecundaria ? participantesCasaSecundaria : participantesCasaBBBLeft);
                chosenPlayer = isCasaSecundaria ? participantesCasaSecundaria[indexPlayer] : participantesCasaBBBLeft[indexPlayer];

                let replacerStr = '(Jogador' + i +')';
                let regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(!isCasaSecundaria) {
                    participantesCasaBBBLeft.splice(indexPlayer, 1);
                }

                i++;
            }

            storyEvents.push(eventText);
        }
        
        return storyEvents;
    }

    provaDoLider = (players) => {
        let playersLeft = this.shuffle([...players]); //embaralha jogadores

        // let provaDoLiderIndex = this.randomize(BBBEvents.provaDoLider.length);
        let provaDoLiderIndex = 0;
        let provaDoLider = BBBEvents.provaDoLider[provaDoLiderIndex];

        let storyEvents = [];
        let worstPlayer = null;

        if(provaDoLider.type === 'resistência'){
            while(playersLeft.length > 1) {
                let qtdPlayers = 0;
                let eventNumber = 0;
                let event;
                do {
                    eventNumber = this.randomize(provaDoLider.events.length);
                    event = provaDoLider.events[eventNumber];
                    qtdPlayers = event.players;
                } while (qtdPlayers > playersLeft.length);

                let i = 1;
                let eventText = event.text;
                let playersInSentence = [...playersLeft];
                while(i <= qtdPlayers){
                    let indexPlayer;
                    let chosenPlayer;

                    if(i === 1){
                        indexPlayer = this.pickOnePlayer(playersLeft);
                        chosenPlayer = playersLeft[indexPlayer];
                    } else {
                        indexPlayer = this.pickOnePlayer(playersInSentence);
                        chosenPlayer = playersInSentence[indexPlayer];
                    }

                    for (let indexSentence = 0; indexSentence < playersInSentence.length; indexSentence++) {
                        if(playersInSentence[indexSentence] === chosenPlayer) {
                            playersInSentence.splice(indexSentence, 1);
                            break;
                        }
                    }

                    let replacerStr = '(Jogador' + i +')';
                    var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                    let newStr = '<b>' + chosenPlayer.name + '</b>';

                    eventText = eventText.replace(regexStr, newStr);

                    if(i === 1){
                        if(worstPlayer === null) {
                            worstPlayer = chosenPlayer;
                        }
                        playersLeft.splice(indexPlayer, 1);
                    }

                    i++;
                }

                storyEvents.push(eventText);
            }

        } else { /* sorte */ }

        return {type: provaDoLider.type, description: provaDoLider.description, events: storyEvents, winner: playersLeft[0], worstPlayer: worstPlayer};
    } 

    formacaoVipXepa = (lider, players) => {
        // a quantidade de pessoas no vip pode variar de 30 a 50% do grupo(contando com o lider pq ele tbm ganha pulseira)
        let qtdDePulseirasVIP = Math.floor(((Math.floor(Math.random() * 21) + 30) / 100) * players.length);

        // o lider tem 90% de chances de usar todas as pulseiras 10% de nao
        let liderUsaraTodasAsPulseiras = (Math.floor(Math.random() * 101)) <= 90;

        let qtdDePulseirasQueLiderVaiUsar = qtdDePulseirasVIP;
        if(!liderUsaraTodasAsPulseiras) {
            qtdDePulseirasQueLiderVaiUsar = Math.floor(Math.random() * qtdDePulseirasVIP) + 1; // numero aleatorio
        }

        let storyEvents = [];
        let VIPlist = [];

        // lider coloca sua pulseira
        let eventText = "(Lider) pegou e colocou a sua pulseira de VIP, e viu que possui mais " + (qtdDePulseirasVIP - 1) + " para distribuir.";

        let replacerLiderStr = '(Lider)';
        let regexLiderStr = new RegExp(this.escapeRegExp(replacerLiderStr), 'g');
        let newLiderStr = '<b>' + lider.name + '</b>';

        eventText = eventText.replace(regexLiderStr, newLiderStr);

        VIPlist.push(lider);
        storyEvents.push(eventText);

        // cria lista de jogadores aptos pro vip sem o lider
        let playersAptosVIP = [];
        players.forEach(player => {
            if(player !== lider){
                playersAptosVIP.push(player);
            }
        });

        // lider escolhe outras pessoas pro vip
        for (let auxDistribuicao = 1; auxDistribuicao < qtdDePulseirasQueLiderVaiUsar; auxDistribuicao++) {
            let indexPlayer = this.pickOnePlayer(playersAptosVIP);
            let chosenPlayer = playersAptosVIP[indexPlayer];

            let eventNumber = this.randomize(BBBEvents.formacaoVIP.length);
            let eventoEscolhido = BBBEvents.formacaoVIP[eventNumber];

            let eventText = eventoEscolhido.text;
            eventText = eventText.replace(regexLiderStr, newLiderStr);

            let replacerJogadorStr = '(Jogador)';
            let regexJogadorStr = new RegExp(this.escapeRegExp(replacerJogadorStr), 'g');
            let newJogadorStr = '<b>' + chosenPlayer.name + '</b>';
            eventText = eventText.replace(regexJogadorStr, newJogadorStr);

            playersAptosVIP.splice(indexPlayer, 1);

            VIPlist.push(chosenPlayer);
            storyEvents.push(eventText);
        }

        if(qtdDePulseirasQueLiderVaiUsar < qtdDePulseirasVIP) {
            let qtdRestanteDePulseiras = qtdDePulseirasVIP - qtdDePulseirasQueLiderVaiUsar;
            let frasePulseira = qtdRestanteDePulseiras > 1 ? "pulseiras" : "pulseira";

            let eventTextExtra = "(Lider) verificou que ainda haviam mais " + (qtdRestanteDePulseiras) + " " + frasePulseira +" para serem distribuídas e decide não dar para mais ninguém.";
            eventTextExtra = eventTextExtra.replace(regexLiderStr, newLiderStr);
            storyEvents.push(eventTextExtra);
        }

        // informa pessoas da xepa
        let XEPAlist = [...playersAptosVIP];
        let eventTextXEPA = "Estão na XEPA: ";

        let contador = 1; 
        XEPAlist.forEach(player => {
            let jogadorNome = '<b>' + player.name + '</b>';
            eventTextXEPA += jogadorNome;

            if(contador === XEPAlist.length){
                eventTextXEPA += ".";
            } else if(contador === (XEPAlist.length -1)){
                eventTextXEPA += " e ";
            } else {
                eventTextXEPA += ", ";
            }
            contador++;
        });

        storyEvents.push(eventTextXEPA);

        return {qtdDePulseirasVIP: qtdDePulseirasVIP, qtdDePulseirasLider: qtdDePulseirasQueLiderVaiUsar, events: storyEvents, VIPlist: VIPlist, XEPAlist: XEPAlist };
    }

    primeiraFesta = (players) => {
        let playersOrder = [...players];
        let playersGone = [];

        let storyEvents = [];

        while(playersOrder.length > 0){
            let qtdPlayers = 0;
            let eventNumber = 0;
            let event;
            do {
                eventNumber = this.randomize(BBBEvents.primeiraFesta.length);
                event = BBBEvents.primeiraFesta[eventNumber];
                qtdPlayers = event.players;
            } while (qtdPlayers > (playersGone.length + 1));

            let i = 1;
            let eventText = event.text;
            // let firstPlayer = null;
            let playersGoneAux = [...playersGone];
            while(i <= qtdPlayers){
                let indexPlayer;
                let chosenPlayer;

                if(i === 1){
                    indexPlayer = this.pickOnePlayer(playersOrder);
                    chosenPlayer = playersOrder[indexPlayer];
                    
                    // firstPlayer = chosenPlayer;
                    playersGone.push(chosenPlayer);
                } else {
                    indexPlayer = this.pickOnePlayer(playersGoneAux);
                    chosenPlayer = playersGoneAux[indexPlayer];
                }

                let replacerStr = '(Jogador' + i +')';
                var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                let newStr = '<b>' + chosenPlayer.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                if(i === 1){
                    playersOrder.splice(indexPlayer, 1);
                } else {
                    playersGoneAux.splice(indexPlayer, 1);
                }

                i++;
            }

            storyEvents.push(eventText);
        }

        return storyEvents;
    }

    provaDoAnjo = (players, lider) => {

        let storyEvents = [];
        let melhorJogador = null;
        let piorJogador = null;
        let jogadorVetado = null;

        // decide se o líder poderá vetar alguém de fazer a prova do anjo. 70% -> lider n veta, de 71 a 100% -> lider veta
        let vetoDoLider = this.randomize(101) > 70 ? true : false;

        if(vetoDoLider) {
            while(jogadorVetado === null){
                let indexPlayer = this.pickOnePlayer(players);
                let chosenPlayer = players[indexPlayer];

                if(chosenPlayer !== lider){
                    jogadorVetado = chosenPlayer;
                }
            }

            // lider coloca sua pulseira
            let eventText = "Por ser líder, (Lider) deve vetar um jogador de fazer a prova do anjo. (Lider) decidiu vetar (Vetado).";
            if(jogadorVetado === lider) {
                eventText = "Por ser líder, (Lider) deve vetar um jogador de fazer a prova do anjo. (Lider) decidiu sabonetar e se vetou da prova.";
            }

            let replacerLiderStr = '(Lider)';
            let regexLiderStr = new RegExp(this.escapeRegExp(replacerLiderStr), 'g');
            let newLiderStr = '<b>' + lider.name + '</b>';

            eventText = eventText.replace(regexLiderStr, newLiderStr);

            let replacerVetadoStr = '(Vetado)';
            let regexVetadoStr = new RegExp(this.escapeRegExp(replacerVetadoStr), 'g');
            let newVetadoStr = '<b>' + jogadorVetado.name + '</b>';

            eventText = eventText.replace(regexVetadoStr, newVetadoStr);

            storyEvents.push(eventText);
        }

        // a quantidade de pessoas a serem sorteadas pra prova do anjo pode variar de 30 a 50% do grupo.
        let auxQtdPlayers = jogadorVetado !== null ? players.length - 1 : players.length;
        let qtdDeJogadores = Math.floor(((Math.floor(Math.random() * 21) + 30) / 100) * auxQtdPlayers);

        storyEvents.push("A prova do anjo dessa semana irá conter apenas " + qtdDeJogadores + " jogadores.");

        let playersAux = [...players];
        let jogadoresParticipantes = [];

        for (let index = 0; index < qtdDeJogadores; index++) {
            let chosenPlayer;
            let indexPlayer;
            do {
                indexPlayer = this.pickOnePlayer(playersAux);
                chosenPlayer = playersAux[indexPlayer];
            } while (chosenPlayer === jogadorVetado);

            jogadoresParticipantes.push(chosenPlayer);

            playersAux.splice(indexPlayer, 1);
        }

        // informa pessoas sorteadas
        let eventTextSorteados = "Os jogadores participaram de um sorteio para a prova do anjo.<br/>Os sorteados que irão participar da prova do anjo são: ";

        let contador = 1; 
        jogadoresParticipantes.forEach(player => {
            let jogadorNome = '<b>' + player.name + '</b>';
            eventTextSorteados += jogadorNome;

            if(contador === jogadoresParticipantes.length){
                eventTextSorteados += ".";
            } else if(contador === (jogadoresParticipantes.length -1)){
                eventTextSorteados += " e ";
            } else {
                eventTextSorteados += ", ";
            }
            contador++;
        });

        storyEvents.push(eventTextSorteados);

        // prova do anjo em si

        let provaDoAnjoIndex = this.randomize(BBBEvents.provaDoAnjo.length);
        let provaDoAnjo = BBBEvents.provaDoAnjo[provaDoAnjoIndex];

        if(provaDoAnjo.type === "tempo") {

            let melhorTempo = 100;
            let piorTempo = 0;

            storyEvents.push(provaDoAnjo.description);

            let playersShuffle = this.shuffle(jogadoresParticipantes);


            playersShuffle.forEach(player => {
                // decide desclassificacao
                let seraDesclassificado = this.randomize(101) > 90 ? true : false; // 90% de nao ter

                let eventText = seraDesclassificado ? provaDoAnjo.eventFatal : provaDoAnjo.eventTempo;

                let replacerStr = '(Jogador)';
                let regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');
                let newStr = '<b>' + player.name + '</b>';

                eventText = eventText.replace(regexStr, newStr);

                
                if(!seraDesclassificado) {
                    let tempo = this.randomize(11) + Math.random();

                    let replacerTempoStr = '(Tempo)';
                    let regexTempoStr = new RegExp(this.escapeRegExp(replacerTempoStr), 'g');
                    let newTempoStr = '<b>' + tempo + '</b>';

                    eventText = eventText.replace(regexTempoStr, newTempoStr);

                    // atualiza melhor tempo
                    melhorTempo = tempo < melhorTempo ? tempo : melhorTempo;
                    piorTempo = tempo > piorTempo ? tempo : piorTempo;

                    if(melhorTempo === tempo) {
                        melhorJogador = player;
                    }
                    if(piorTempo === tempo) {
                        piorJogador = player;
                    }
                } else {
                    if(piorTempo < 1000){
                        piorTempo = 1000;
                        piorJogador = player;
                    }
                }
                
                storyEvents.push(eventText);
            });

            // anuncia vencedor

            let fraseVitoria = "O anjo da semana é (Vencedor)!";
            let replacerVencedorStr = '(Vencedor)';
            let regexVencedorStr = new RegExp(this.escapeRegExp(replacerVencedorStr), 'g');
            let newVencedorStr = '<b>' + melhorJogador.name + '</b>';

            fraseVitoria = fraseVitoria.replace(regexVencedorStr, newVencedorStr);

            storyEvents.push(fraseVitoria);
        } else {}

        return({type: provaDoAnjo.type, events: storyEvents, anjo: melhorJogador, piorJogador: piorJogador, jogadorVetado: jogadorVetado});
    }

    castigoDoMonstro = (players, anjo, XEPAlist, VIPlist) => {
        let novaXEPAlist = [...XEPAlist];
        let novaVIPlist = [...VIPlist];
        let storyEvents = [];
        let monstros = [];
        let monstrosIndex = [];

        // define monstros
        let playersAux = [...players];
        for (let index = 0; index < 2; index++) {
            let chosenPlayer;
            let indexPlayer;
            do {
                indexPlayer = this.pickOnePlayer(playersAux);
                chosenPlayer = playersAux[indexPlayer];
            } while (chosenPlayer === anjo);

            monstros.push(chosenPlayer);
            monstrosIndex.push(indexPlayer);

            playersAux.splice(indexPlayer, 1);
        }

        // escolhe um castigo
        let castigoDoMonstroIndex = this.randomize(BBBEvents.castigoDoMonstro.length);
        let castigoDoMonstro = BBBEvents.castigoDoMonstro[castigoDoMonstroIndex];

        if(castigoDoMonstro.type === "musica") {

            let eventNumber = this.randomize(castigoDoMonstro.events.length);
            let event = castigoDoMonstro.events[eventNumber];

            let eventText = event.text;

            let replacerAnjoStr = '(Anjo)';
            let regexAnjoStr = new RegExp(this.escapeRegExp(replacerAnjoStr), 'g');
            let newAnjoStr = '<b>' + anjo.name + '</b>';

            eventText = eventText.replace(regexAnjoStr, newAnjoStr);

            let replacerMonstro1Str = '(Jogador1)';
            let regexMonstro1Str = new RegExp(this.escapeRegExp(replacerMonstro1Str), 'g');
            let newMonstro1Str = '<b>' + monstros[0].name + '</b>';

            eventText = eventText.replace(regexMonstro1Str, newMonstro1Str);

            let replacerMonstro2Str = '(Jogador2)';
            let regexMonstro2Str = new RegExp(this.escapeRegExp(replacerMonstro2Str), 'g');
            let newMonstro2Str = '<b>' + monstros[1].name + '</b>';

            eventText = eventText.replace(regexMonstro2Str, newMonstro2Str);

            storyEvents.push(eventText);
        } else {}

        // verifica se vip vai pra xepa
        let foramPraXepa = []; // somente indexes
        let indexAux = 0;
        let indexAuxVIP = 0;
        let saveIndex = 0;
        let saveIndexVIP = 0;
        monstros.forEach(monstro => {
            novaVIPlist.forEach(vip => {
                if(monstro === vip) {
                    foramPraXepa.push(monstro);
                    saveIndex = indexAux;
                    saveIndexVIP = indexAuxVIP;
                }
                indexAuxVIP++;
            });

            if(saveIndexVIP > 0){
                novaVIPlist.splice(saveIndexVIP, 1);
                saveIndexVIP = 0;
            }

            indexAux++;
        });

        if(foramPraXepa.length > 0) {
            if(foramPraXepa.length > 1) {
                let eventText = "(Jogador1) e (Jogador2) que estavam no VIP foram para XEPA.";

                let replacerMonstro1Str = '(Jogador1)';
                let regexMonstro1Str = new RegExp(this.escapeRegExp(replacerMonstro1Str), 'g');
                let newMonstro1Str = '<b>' + monstros[0].name + '</b>';

                eventText = eventText.replace(regexMonstro1Str, newMonstro1Str);

                let replacerMonstro2Str = '(Jogador2)';
                let regexMonstro2Str = new RegExp(this.escapeRegExp(replacerMonstro2Str), 'g');
                let newMonstro2Str = '<b>' + monstros[1].name + '</b>';

                eventText = eventText.replace(regexMonstro2Str, newMonstro2Str);

                storyEvents.push(eventText);
            } else {
                let eventText = "(Jogador1) que estava no VIP foi pra XEPA.";

                let replacerMonstro1Str = '(Jogador1)';
                let regexMonstro1Str = new RegExp(this.escapeRegExp(replacerMonstro1Str), 'g');
                let newMonstro1Str = '<b>' + monstros[saveIndex].name + '</b>';

                eventText = eventText.replace(regexMonstro1Str, newMonstro1Str);

                storyEvents.push(eventText);
            }

            // retira os vips por conta do monstro
            novaXEPAlist = [...novaXEPAlist, ...foramPraXepa];

        } 
        return {description: castigoDoMonstro.description, events: storyEvents, monstros: monstros, XEPAlist: novaXEPAlist,VIPlist: novaVIPlist}
    }

    presenteDoAnjo = (players, anjo, lider, XEPAlist, VIPlist, piorLider, piorAnjo, monstros) => {

        let presenteDoAnjoIndex;
        let presenteDoAnjo;

        do {
            presenteDoAnjoIndex = this.randomize(BBBEvents.presenteDoAnjo.length);
            presenteDoAnjo = BBBEvents.presenteDoAnjo[presenteDoAnjoIndex];
        } while ((presenteDoAnjo.motive === 'piores' && anjo === piorLider) || presenteDoAnjo.motive === 'lider' && anjo === lider);

        let jogador1 = null;
        let jogador2 = null;
        let jogador3 = null;

        switch (presenteDoAnjo.motive) {
            case 'monstro':
                jogador1 = monstros[0];
                jogador2 = monstros[1];

                while (jogador3 === null || jogador1 === jogador3 || jogador2 === jogador3 || jogador3 === anjo) {
                    let indexPlayer = this.pickOnePlayer(players);
                    jogador3 = players[indexPlayer];
                }
                break;
            case 'piores':
                jogador1 = piorLider;
                jogador2 = piorAnjo;

                while (jogador3 === null || jogador1 === jogador3 || jogador2 === jogador3 || jogador3 === anjo) {
                    let indexPlayer = this.pickOnePlayer(players);
                    jogador3 = players[indexPlayer];
                }
                break;
            case 'lider':
                jogador1 = lider;

                while (jogador2 === null || jogador2 === jogador1 || jogador2 === anjo) {
                    let indexPlayer = this.pickOnePlayer(players);
                    jogador2 = players[indexPlayer];
                }

                while (jogador3 === null || jogador1 === jogador3 || jogador2 === jogador3 || jogador3 === anjo) {
                    let indexPlayer = this.pickOnePlayer(players);
                    jogador3 = players[indexPlayer];
                }
                break;
            case 'quarto':
                do {
                    let shuffledPlayers = this.shuffle(players);
                    jogador1 = shuffledPlayers[0];
                    jogador2 = shuffledPlayers[1];
                    jogador3 = shuffledPlayers[2];
                } while (anjo === jogador1 || anjo === jogador2 || anjo === jogador3);

                break;
            case 'xepa':
                do {
                    let shuffledXEPAPlayers = this.shuffle(XEPAlist);
                    jogador1 = shuffledXEPAPlayers[0];
                    jogador2 = shuffledXEPAPlayers[1];
                    jogador3 = shuffledXEPAPlayers[2];
                } while (anjo === jogador1 || anjo === jogador2 || anjo === jogador3);
                break;
            default: // vip
                do {
                    let shuffledVIPPlayers = this.shuffle(VIPlist);
                    jogador1 = shuffledVIPPlayers[0];
                    jogador2 = shuffledVIPPlayers[1];
                    jogador3 = shuffledVIPPlayers[2];
                } while (anjo === jogador1 || anjo === jogador2 || anjo === jogador3);
        }

        let presenteDoAnjoEventoIndex = this.randomize(presenteDoAnjo.events.length);
        let presenteDoAnjoEvento = presenteDoAnjo.events[presenteDoAnjoEventoIndex];

        let eventText = presenteDoAnjoEvento.text;

        let replacerAnjoStr = '(Anjo)';
        let regexAnjoStr = new RegExp(this.escapeRegExp(replacerAnjoStr), 'g');
        let newAnjoStr = '<b>' + anjo.name + '</b>';
        eventText = eventText.replace(regexAnjoStr, newAnjoStr);

        let replacerJogador1Str = '(Jogador1)';
        let regexJogador1Str = new RegExp(this.escapeRegExp(replacerJogador1Str), 'g');
        let newJogador1Str = '<b>' + jogador1.name + '</b>';
        eventText = eventText.replace(regexJogador1Str, newJogador1Str);

        let replacerJogador2Str = '(Jogador2)';
        let regexJogador2Str = new RegExp(this.escapeRegExp(replacerJogador2Str), 'g');
        let newJogador2Str = '<b>' + jogador2.name + '</b>';
        eventText = eventText.replace(regexJogador2Str, newJogador2Str);

        let replacerJogador3Str = '(Jogador3)';
        let regexJogador3Str = new RegExp(this.escapeRegExp(replacerJogador3Str), 'g');
        let newJogador3Str = '<b>' + jogador3.name + '</b>';
        eventText = eventText.replace(regexJogador3Str, newJogador3Str);

        return eventText;
    }

    dinamicaDoParedao = (oBigFoneFoiRecenteRecebido) => {
        let storyEvents = [];

        let oBigFoneVaiTocar = false;
        let oBigFoneVaiSalvar = false;
        let tipoBigFone = "";
        let oBigFoneFoiRecente = oBigFoneFoiRecenteRecebido;

        let anjoAutoimune = this.randomize(100) > 50 ? true : false;

        if(anjoAutoimune) {
            storyEvents.push("O anjo dessa semana será autoimune!");
        } else {
            storyEvents.push("O anjo dessa semana não será autoimune!");
        }

        let qtdEventosDinamica = BBBEvents.dinamicaParedao.length;
        let qtdEventosDinamicaComBigFone = BBBEvents.dinamicaParedaoComBigFone.length;

        let terceiroEmparedadoIndex = this.randomize(oBigFoneFoiRecente ? qtdEventosDinamica : qtdEventosDinamicaComBigFone);
        let terceiroEmparedado = oBigFoneFoiRecente ? BBBEvents.dinamicaParedao[terceiroEmparedadoIndex] : BBBEvents.dinamicaParedaoComBigFone[terceiroEmparedadoIndex];

        let quartoEmparedadoIndex = this.randomize(oBigFoneFoiRecente ? qtdEventosDinamica : qtdEventosDinamicaComBigFone);
        let quartoEmparedado =  oBigFoneFoiRecente ? BBBEvents.dinamicaParedao[quartoEmparedadoIndex] : BBBEvents.dinamicaParedaoComBigFone[quartoEmparedadoIndex];

        oBigFoneVaiTocar = (terceiroEmparedado.bigfone || quartoEmparedado.bigfone);

        let primeiroEmparedadoTxt = "Líder indica alguém para o paredão.";
        let segundoEmparedadoTxt = "O mais votado pela casa irá ao paredão.";
        let terceiroEmparedadoTxt = terceiroEmparedado.description;
        let quartoEmparedadoTxt = 
            (terceiroEmparedado.bigfone && quartoEmparedado.bigfone) 
                ? quartoEmparedado.extra 
                :   (terceiroEmparedadoIndex === quartoEmparedadoIndex)
                        ?   quartoEmparedado.extra
                        :   quartoEmparedado.description;

        storyEvents.push(primeiroEmparedadoTxt);
        storyEvents.push(segundoEmparedadoTxt);
        storyEvents.push(terceiroEmparedadoTxt);
        storyEvents.push(quartoEmparedadoTxt);

        // imunizacao do big fone
        if(!oBigFoneVaiTocar){
            var aleatorio = this.randomize(100);
            oBigFoneVaiTocar = aleatorio > 90 ? true : false; // menos de 10% do bigfone tocar
            oBigFoneVaiSalvar = oBigFoneVaiTocar;

            if(oBigFoneVaiTocar){
                let dinamicaBigFoneSalvaIndex = this.randomize(BBBEvents.dinamicaBigFone.length);
                let dinamicaBigFoneSalva = BBBEvents.dinamicaBigFone[dinamicaBigFoneSalvaIndex];

                tipoBigFone = dinamicaBigFoneSalva.type;
                storyEvents.push(dinamicaBigFoneSalva.description);
            }
        } else {
            if(terceiroEmparedado.bigfone){
                tipoBigFone = terceiroEmparedado.type;
            } else {
                tipoBigFone = quartoEmparedado.type;
            }
        }

        return {
            dinamicaTxt: storyEvents, 
            terceiro: terceiroEmparedadoIndex, 
            quarto: quartoEmparedadoIndex,
            oBigFoneVaiTocar: oBigFoneVaiTocar,
            oBigFoneVaiSalvar: oBigFoneVaiSalvar,
            tipoBigFone: tipoBigFone,
            anjoAutoimune: anjoAutoimune
        }
    }

    tocarBigFone = (players, lider, dinamica) => {

        let storyEvents = [];

        let indexPlayerAtendente = this.pickOnePlayer(players);
        let playerAtendente = players[indexPlayerAtendente];

        let textAtendente = "<b>" + playerAtendente.name + "</b> atendeu o big fone!";
        storyEvents.push(textAtendente);

        let indexPlayerPuchado;
        let playerPuchado;

        let eventoIndex = null;
        let evento = null;

        let imune = null;
        let emparedado = null;

        do {
            indexPlayerPuchado = this.pickOnePlayer(players);
            playerPuchado = players[indexPlayerPuchado];
        } while (playerPuchado === lider || playerPuchado === playerAtendente);

        storyEvents.push(dinamica.tipoBigFone);

        switch (dinamica.tipoBigFone) {
            case "indicacaoBigFone":
                storyEvents.push(BBBEvents.bigFone.indicacaoBigFone);

                eventoIndex = this.randomize(BBBEvents.bigFoneMotivo.emparedar.length);
                evento = BBBEvents.bigFoneMotivo.emparedar[eventoIndex];

                emparedado = playerPuchado;

                break;
            case "indicadoBigFone":
                storyEvents.push(BBBEvents.bigFone.indicadoBigFone);

                if(playerAtendente === lider){
                    eventoIndex = this.randomize(BBBEvents.bigFoneMotivo.emparedar.length);
                    evento = BBBEvents.bigFoneMotivo.emparedar[eventoIndex];

                    emparedado = playerPuchado;
                } else {
                    let txtAux = "<b>" + playerAtendente.name + "</b> comunicou a todos que está no padedão."
                    storyEvents.push(txtAux)
                    emparedado = playerAtendente;
                }

                break;
            case "indicadoBigFoneOculta":
                storyEvents.push(BBBEvents.bigFone.indicadoBigFoneOculta);

                do {
                    indexPlayerPuchado = this.pickOnePlayer(players);
                    playerPuchado = players[indexPlayerPuchado];
                } while (playerPuchado === lider);

                if(playerPuchado === playerAtendente){
                    let textAux = "<b>" + playerAtendente.name + "</b> decidiu ficar com a pulseira.";
                    storyEvents.push(textAux);
                } else {
                    eventoIndex = this.randomize(BBBEvents.bigFoneMotivo.pulseira.length);
                    evento = BBBEvents.bigFoneMotivo.pulseira[eventoIndex];
                }
                emparedado = playerPuchado;

                break;
            case "imunizaAtendente":
                storyEvents.push(BBBEvents.bigFone.imunizaAtendente);
                
                let txtAux = "<b>" + playerAtendente.name + "</b> comunicou a todos que está imune ao paredão da semana."
                storyEvents.push(txtAux)
                
                imune = playerAtendente;

                break;
            case "atendenteImuniza":
                storyEvents.push(BBBEvents.bigFone.atendenteImuniza);

                eventoIndex = this.randomize(BBBEvents.bigFoneMotivo.imunizar.length);
                evento = BBBEvents.bigFoneMotivo.imunizar[eventoIndex];

                imune = playerPuchado;

                break;
            case "imuniza":
                storyEvents.push(BBBEvents.bigFone.imuniza);

                do {
                    indexPlayerPuchado = this.pickOnePlayer(players);
                    playerPuchado = players[indexPlayerPuchado];
                } while (playerPuchado === lider);

                if(playerPuchado === playerAtendente){
                    let textAux = "<b>" + playerAtendente.name + "</b> decidiu ficar com a imunidade.";
                    storyEvents.push(textAux);
                } else {
                    eventoIndex = this.randomize(BBBEvents.bigFoneMotivo.imunizar.length);
                    evento = BBBEvents.bigFoneMotivo.imunizar[eventoIndex];
                }

                imune = playerPuchado;

                break;
        
            default: // imunizaOculto
                storyEvents.push(BBBEvents.bigFone.imunizaOculto);

                do {
                    indexPlayerPuchado = this.pickOnePlayer(players);
                    playerPuchado = players[indexPlayerPuchado];
                } while (playerPuchado === lider);

                if(playerPuchado === playerAtendente){
                    let textAux = "<b>" + playerAtendente.name + "</b> decidiu ficar com a pulseira.";
                    storyEvents.push(textAux);
                } else {
                    eventoIndex = this.randomize(BBBEvents.bigFoneMotivo.pulseira.length);
                    evento = BBBEvents.bigFoneMotivo.pulseira[eventoIndex];
                }

                imune = playerPuchado;

                break;
        }

        if(evento !== null) {
            let eventText = evento.text;

            let replacerJogador1Str = '(Jogador1)';
            let regexJogador1Str = new RegExp(this.escapeRegExp(replacerJogador1Str), 'g');
            let newJogador1Str = '<b>' + playerAtendente.name + '</b>';
            eventText = eventText.replace(regexJogador1Str, newJogador1Str);

            let replacerJogador2Str = '(Jogador2)';
            let regexJogador2Str = new RegExp(this.escapeRegExp(replacerJogador2Str), 'g');
            let newJogador2Str = '<b>' + playerPuchado.name + '</b>';
            eventText = eventText.replace(regexJogador2Str, newJogador2Str);

            storyEvents.push(eventText);
        }

        storyEvents.push("Os participantes da casa já começaram a fazer teorias sobre como será o próximo paredão.");

        return {
            occurrencies: storyEvents,
            imune: imune,
            emparedado: emparedado,
            atendente: playerAtendente
        }
    }

    formacaoDeParedao = (apresentador, players, lider, anjo, monstos, imunes, dinamica, piorDoLider, piorDoAnjo, bigfone) => {

        let storyEvents = [];
        let emparedados = [];

        // inicio apresentador
        let apresentacaoApresentador = "<b>" + apresentador + "</b> aparece na televisão da sala para cumprimentar os participantes.";
        storyEvents.push(apresentacaoApresentador);

        // monstro liberado
        let apresentadorConversaMonstro = "<b>" + apresentador + "</b> começa a conversar com os monstros <b>" + monstos[0].name + "</b> e <b>" + monstos[1].name + "</b> sobre o monstro da semana.";
        storyEvents.push(apresentadorConversaMonstro);

        let eventMonstroIndex = this.randomize(BBBEvents.dialogosMonstros.length);
        let eventMonstro = BBBEvents.dialogosMonstros[eventMonstroIndex];

        let eventText = eventMonstro.text;

        let replacerJogador1Str = '(Jogador1)';
        let regexJogador1Str = new RegExp(this.escapeRegExp(replacerJogador1Str), 'g');
        let newJogador1Str = '<b>' + playerAtendente.name + '</b>';
        eventText = eventText.replace(regexJogador1Str, newJogador1Str);
        storyEvents.push(eventText);

        let apresentadorLiberaMonstro = "<b>" + apresentador + "</b> decretou o fim do castigo do monstro dessa semana.";
        storyEvents.push(apresentadorLiberaMonstro);

        // avisos emparedados
        let avisoEmparedadosApresentador = "<b>" + apresentador + "</b> avisa que confome combinado com o público ";

        switch (dinamica.type) {
            case "piorDoLider":
                let avisoPiorDoLider = avisoEmparedadosApresentador + "o jogador que obtivesse o pior desempenho a prova do líder estaria no paredão.";
                storyEvents.push(avisoPiorDoLider);

                let textoPiorDoLider = "Com isso, <b>" + piorDoLider.name + "</b> está no paredão.";
                storyEvents.push(textoPiorDoLider);

                emparedados.push(piorDoLider);
                break;
            case "piorDoAnjo":
                let avisoPiorDoAnjo = avisoEmparedadosApresentador + "o jogador que obtivesse o pior desempenho a prova do anjo estaria no paredão.";
                storyEvents.push(avisoPiorDoAnjo);

                let textoPiorDoAnjo = "Com isso, <b>" + piorDoAnjo.name + "</b> está no paredão.";
                storyEvents.push(textoPiorDoAnjo);

                emparedados.push(piorDoLider);
                break;
            case "indicacaoBigFone":
                let avisoIndicacaoBigFone = "<b>" + apresentador + "</b> voltou a confirmar que <b>" + bigfone.emparedado.name + "<b/> está no paredão pois foi indicado por <b>" + bigfone.atendente.name + "</b> ao atender o Big Fone.";
                storyEvents.push(avisoIndicacaoBigFone);

                emparedados.push(bigfone.emparedado);
                break;
            case "indicadoBigFone":
                let avisoIndicadoBigFone = "<b>" + apresentador + "</b> voltou a confirmar que <b>" + bigfone.emparedado.name + "<b/> está no paredão pois atendeu o Big Fone.";
                storyEvents.push(avisoIndicadoBigFone);

                emparedados.push(bigfone.emparedado);
                break;
            case "indicadoBigFoneOculta":
                let avisoIndicadoBigFoneOculta = avisoEmparedadosApresentador + "a pulseira que <b>" + bigfone.atendente.name + "<b/> recebeu ao atender o Big Fone iria emparedar quem a recebesse.";
                storyEvents.push(avisoIndicadoBigFoneOculta);

                let textoIndicadoBigFoneOculta = "Com isso, <b>" + bigfone.emparedado.name + "</b> está no paredão.";
                storyEvents.push(textoIndicadoBigFoneOculta);

                emparedados.push(bigfone.emparedado);
                break;

            default: // normal
                // case "doisMaisVotados":
                // case "contragolpeMaisVotado":
                // case "contragolpeIndicadoDoLider":
                // case "indicacaoDoAnjo":
                break;
        }

        // anjo imuniza

        // lider indica

        // votacao

        // terceiro e quarto emparedado

        // dedo-duro
    }
}

export default (new BBBLogic());