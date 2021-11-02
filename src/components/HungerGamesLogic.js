import HungerGamesEvents from "./HungerGamesEvents";

class HungerGamesLogic {

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

        let isBloodbath = true;
        let isDay = false;
        let isFallen = false;
        let isNight = false;
        let isFeast = false;
        let resultsArray = [];

        let dayAndNightControl = 1;

        do {
            if(!isFallen){
                playersAlive = [];

                let resultFull = [];
                let type = 0;

                while(playersLeft.length > 0){
                    let event;
                    let qtdTributes = 0;

                    if(isBloodbath){
                        type = 0;
                        do {
                            event = this.bloodbath();
                            qtdTributes = event.event.tributes;
                        } while (qtdTributes > playersLeft.length);
                    }

                    if(isDay) {
                        type = 1;
                        do {
                            event = this.day();
                            qtdTributes = event.event.tributes;
                        } while (qtdTributes > playersLeft.length);
                    }

                    if(isNight) {
                        type = 3;
                        do {
                            event = this.night();
                            qtdTributes = event.event.tributes;
                        } while (qtdTributes > playersLeft.length);
                    }
                    
                    if(isFeast) {
                        type = 4;
                        do {
                            event = this.feast();
                            qtdTributes = event.event.tributes;
                        } while (qtdTributes > playersLeft.length);
                    }

                    let i = 1;
                    let eventText = event.event.text;
                    while(i <= qtdTributes){


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

                        // let color = isDead ? 'name-red' : 'name-red';
                        let newStr = '<b>' + chosenPlayer + '</b>';

                        eventText = eventText.replace(regexStr, newStr);

                        playersLeft.splice(indexPlayer, 1);

                        i++;
                    }

                    resultFull.push(eventText);
                }

                resultsArray.push({type: type, occurrencies: resultFull, day: dayAndNightControl});
            } else {
                resultsArray.push({type: 2, deaths: playersDead});
                playersDead = [];
            }

            if(isBloodbath) {
                isBloodbath = false;
                isDay = true;
            } else {
                if(isDay) {
                    isDay = false;
                    isFallen = true;
                    if(dayAndNightControl === 6){
                        isFallen = false;
                        isFeast = true;
                    }
                } else {
                    if(isFeast) {
                        isFeast = false;
                        isFallen = true;
                    } else {
                        if(isFallen) {
                            isFallen = false;
                            isNight = true;
                        } else {
                            if(isNight) {
                                isNight = false;
                                isDay = true;
                                dayAndNightControl++;
                            }
                        }
                    }
                }
            }

            playersLeft = [...playersAlive];

        } while(playersAlive.length > 1);

        console.log({story: resultsArray, winner: playersAlive});

        return({story: resultsArray, winner: playersAlive});
    }


    randomize = (total) => {
        return Math.floor(Math.random() * total);
    }

    probabilityFatal = function(percentage) {
        return !!percentage && Math.random() <= percentage;
    };

    bloodbath = () => {
        let isFatal = this.probabilityFatal(.3); // 30% de morte

        let event = '';
        let eventNumber = 0;

        if(!isFatal){
            eventNumber = this.randomize(28);
            event = HungerGamesEvents.bloodbath(eventNumber);
        } else {
            eventNumber = this.randomize(53);
            event = HungerGamesEvents.bloodbathFatal(eventNumber);
        }

        return({isFatal: isFatal, eventNumber: eventNumber, event: event});
    }

    day = () => {
        let isFatal = this.probabilityFatal(.2); // 50% de morte

        let event = '';
        let eventNumber = 0;

        if(!isFatal){
            eventNumber = this.randomize(47);
            event = HungerGamesEvents.day(eventNumber);
        } else {
            eventNumber = this.randomize(76);
            event = HungerGamesEvents.dayAndNightFatal(eventNumber);
        }

        return({isFatal: isFatal, eventNumber: eventNumber, event: event});
    }

    night = () => {
        let isFatal = this.probabilityFatal(.2); // 20% de morte

        let event = '';
        let eventNumber = 0;

        if(!isFatal){
            eventNumber = this.randomize(46);
            event = HungerGamesEvents.night(eventNumber);
        } else {
            eventNumber = this.randomize(76);
            event = HungerGamesEvents.dayAndNightFatal(eventNumber);
        }

        return({isFatal: isFatal, eventNumber: eventNumber, event: event});
    }

    feast = () => {
        let isFatal = this.probabilityFatal(.2); // 20% de morte

        let event = '';
        let eventNumber = 0;

        if(!isFatal){
            eventNumber = this.randomize(11);
            event = HungerGamesEvents.feast(eventNumber);
        } else {
            eventNumber = this.randomize(59);
            event = HungerGamesEvents.feastFatal(eventNumber);
        }

        return({isFatal: isFatal, eventNumber: eventNumber, event: event});
    }
}

export default (new HungerGamesLogic());