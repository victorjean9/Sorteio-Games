import FortniteEvents from "./FortniteEvents";

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
                while(i <= qtdPlayers){
                    let indexPlayer = this.pickOnePlayer(playersLeft);
                    let chosenPlayer = playersLeft[indexPlayer];
                    let isDead = false;
                    
                    if(event.isFatal){
                        let j = 0;

                        while(j < event.event.deaths.length) {
                            if(event.event.deaths[j] === i){
                                playersDead.push(chosenPlayer);
                            }
                            j++;
                        }

                        
                        playersDead.forEach(element => {
                            if(element === chosenPlayer){
                                isDead= true;
                            }
                        });
                        if(!isDead) {
                            playersAlive.push(chosenPlayer);
                        }
                        
                    } else {
                        playersAlive.push(chosenPlayer);
                    }

                    let replacerStr = '(Jogador' + i +')';
                    var regexStr = new RegExp(this.escapeRegExp(replacerStr), 'g');

                    let newStr = '<b class="fort-player-name">' + chosenPlayer.name + '</b>';

                    eventText = eventText.replace(regexStr, newStr);

                    playersLeft.splice(indexPlayer, 1);

                    i++;
                }

                resultFull.push(eventText);
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
        let isFatal = this.probabilityFatal(.3); // 30% de morte

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
        let probabilidade = .2;
        if(onda > 9) {
            probabilidade = .3;
        }

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