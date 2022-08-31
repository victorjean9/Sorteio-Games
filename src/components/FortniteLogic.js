import FortniteEvents from "./FortniteEvents";
import crownFort from "../images/fortnite/crown.png";

class FortniteLogic {

    escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    pickOnePlayer = (playersList) => {
        if(playersList.length > 1) {
            return this.randomize(playersList.length);
        } else {
            return 0;
        }
    }

    generateGame = (playersList) => {

        let playersLeft = [...playersList];
        let playersDead = [];
        let playersAlive = [];

        let isDrop = true;

        let resultsArray = [];
        
        let onda = 1;

        do {
            playersAlive = [];

            let resultFull = [];

            while(playersLeft.length > 0){
                let event;
                let qtdPlayers = 0;

                if(isDrop){
                    do {
                        event = this.drop();
                        qtdPlayers = event.event.players;
                    } while (qtdPlayers > playersLeft.length);
                } else {
                    do {
                        event = this.normal(onda);
                        qtdPlayers = event.event.players;
                    } while (qtdPlayers > playersLeft.length);
                }

                let i = 1;
                let eventText = event.event.text;

                let availableCrowns = [];
                let playersAliveInThisEvent = [];

                // põe armas
                for (let indexArmas = 1; indexArmas <= event.event.weapons; indexArmas++) {
                    let pickOneArma = FortniteEvents.armas[this.pickOnePlayer(FortniteEvents.armas)];

                    let replacerStr = '(Arma' + indexArmas +')';
                    var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                    eventText = eventText.replace(regexStr, pickOneArma);
                }

                while(i <= qtdPlayers){
                    let indexPlayer = this.pickOnePlayer(playersLeft);
                    let chosenPlayer = playersLeft[indexPlayer];
                    let isDead = false;
                    
                    if(event.isFatal){
                        let j = 0;

                        while(j < event.event.deaths.length) {
                            if(event.event.deaths[j] === i){
                                playersDead.push(chosenPlayer);
                                if(chosenPlayer.crown) {
                                    availableCrowns.push(chosenPlayer);
                                }
                            }
                            j++;
                        }

                        
                        playersDead.forEach(element => {
                            if(element === chosenPlayer){
                                isDead = true;
                            }
                        });
                        if(!isDead) {
                            playersAlive.push(chosenPlayer);
                            playersAliveInThisEvent.push(chosenPlayer);
                        }
                        
                    } else {
                        playersAlive.push(chosenPlayer);
                    }

                    let replacerStr = '(Jogador' + i +')';
                    var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                    let crownTag = ""
                    if(chosenPlayer.crown) {
                        crownTag = `<img src="${crownFort}" class="ui mini inline image fort-pos-absolute"/>`;
                    }

                    let imgTag = `<img src="${chosenPlayer.fortniteOutfit}" class="ui mini inline image circular fort-icon-outfit"/>`;
                    let newStr = `<b class="fort-player-name"> ${crownTag}${imgTag} ${chosenPlayer.name}</b>`;

                    eventText = eventText.replace(regexStr, newStr);

                    playersLeft.splice(indexPlayer, 1);

                    i++;
                }
                resultFull.push(eventText);

                playersAliveInThisEvent.forEach(player => {
                    if(availableCrowns.length > 0 && !player.crown && playersLeft.length > 0) {
                        let vaiPegarCoroa = false;
                        vaiPegarCoroa = this.randomize(100) < 80;

                        let crownTag = `<img src="${crownFort}" class="ui mini inline image fort-pos-absolute"/>`;
                        let imgTagPlayerAlive = `<img src="${player.fortniteOutfit}" class="ui mini inline image circular fort-icon-outfit"/>`;
                        let imgTagDeadPlayer = `<img src="${availableCrowns[0].fortniteOutfit}" class="ui mini inline image circular fort-icon-outfit fort-icon-pb"/>`;

                        let crownText = `${crownTag}${imgTagPlayerAlive} <b class="fort-player-name">${player.name}</b> pegou a coroa que pertencia a ${imgTagDeadPlayer} <b class="fort-player-name">${availableCrowns[0].name}</b>`;
                        let noCrownText = `${imgTagPlayerAlive} <b class="fort-player-name">${player.name}</b> não conseguiu pegar a coroa que pertencia a ${imgTagDeadPlayer} <b class="fort-player-name">${availableCrowns[0].name}</b>`;
                        resultFull.push(vaiPegarCoroa ? crownText : noCrownText);

                        if(vaiPegarCoroa) {
                            playersAlive.forEach(play => {
                                if(play === player) {
                                    play.crown = true;
                                }
                            });
                        }

                        availableCrowns.splice(0, 1);
                    }
                });
            }
            resultsArray.push({wave: onda, occurrencies: resultFull});

            if(isDrop) {
                isDrop = false;
            }

            playersLeft = [...playersAlive];

            onda++;

        } while(playersAlive.length > 1);

        return({story: resultsArray, winner: playersAlive.length === 1 ? playersAlive[0] : null});
    }


    randomize = (total) => {
        return Math.floor(Math.random() * total);
    }

    probabilityFatal = function(percentage) {
        return !!percentage && Math.random() <= percentage;
    };

    drop = () => {
        let isFatal = this.probabilityFatal(.1); // 30% de morte

        let event = '';
        let eventNumber = 0;

        if(!isFatal){
            eventNumber = this.randomize(FortniteEvents.drop.length);
            event = FortniteEvents.drop[eventNumber];
        } else {
            eventNumber = this.randomize(FortniteEvents.mortesNoDrop.length);
            event = FortniteEvents.mortesNoDrop[eventNumber];
        }

        return({isFatal: isFatal, eventNumber: eventNumber, event: event});
    }

    normal = (onda) => {
        let probabilidade = .2 * ((onda*0.1)+1);

        let isFatal = this.probabilityFatal(probabilidade); // 20% de morte

        let event = '';
        let eventNumber = 0;

        if(!isFatal){
            eventNumber = this.randomize(FortniteEvents.normal.length);
            event = FortniteEvents.normal[eventNumber];
        } else {
            eventNumber = this.randomize(FortniteEvents.mortes.length);
            event = FortniteEvents.mortes[eventNumber];
        }

        return({isFatal: isFatal, eventNumber: eventNumber, event: event});
    }
}

export default (new FortniteLogic());