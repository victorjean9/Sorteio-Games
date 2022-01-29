import ChiquinhaEvents from "./ChiquinhaEvents";

import CocoEmoji from '../images/emojis/pile-of-poo.png';
import MilhoEmoji from '../images/emojis/ear-of-corn.png';
import CoracaoEmoji from '../images/emojis/red-heart.png';
import BeijoEmoji from '../images/emojis/kiss-mark.png';
import FadaEmoji from '../images/emojis/fairy.png';

class ChiquinhaLogic {

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

        let isDay = true;
        let isFallen = false;
        let resultsArray = [];

        let dayControl = 1;

        do {
            if(!isFallen){
                playersAlive = [];

                let resultFull = [];
                let type = 0;

                while(playersLeft.length > 0){
                    let event;
                    let qtdTributes = 0;

                    type = 1;
                    do {
                        event = this.day(dayControl);
                        qtdTributes = event.event.players;
                    } while (qtdTributes > playersLeft.length);

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

                        let newStr = '<b>' + chosenPlayer + '</b>';

                        eventText = eventText.replace(regexStr, newStr);

                        let imgCoracao = `<img src='${CoracaoEmoji}' class='emoji intext' alt='coracao emoji'/>`;
                        let imgCoco = `<img src='${CocoEmoji}' class='emoji intext' alt='coco emoji'/>`;
                        let imgMilho = `<img src='${MilhoEmoji}' class='emoji intext' alt='milho emoji'/>`;
                        let imgFada = `<img src='${FadaEmoji}' class='emoji intext' alt='fada emoji'/>`;
                        let imgBeijo = `<img src='${BeijoEmoji}' class='emoji intext' alt='beijo emoji'/>`;

                        eventText = eventText.replace('❤️', imgCoracao);
                        eventText = eventText.replace('💩', imgCoco);
                        eventText = eventText.replace('🌽', imgMilho);
                        eventText = eventText.replace('🧚', imgFada);
                        eventText = eventText.replace('🧚', imgFada);
                        eventText = eventText.replace('🧚', imgFada);
                        eventText = eventText.replace('💋', imgBeijo);
                        eventText = eventText.replace('💋', imgBeijo);
                        eventText = eventText.replace('💋', imgBeijo);

                        playersLeft.splice(indexPlayer, 1);

                        i++;
                    }

                    resultFull.push(eventText);
                }

                resultsArray.push({type: type, occurrencies: resultFull, day: dayControl});
            } else {
                resultsArray.push({type: 2, deaths: playersDead});
                playersDead = [];
            }

            if(isDay) {
                isDay = false;
                isFallen = true;
                dayControl++;
            } else {
                isFallen = false;
                isDay = true;
            }

            playersLeft = [...playersAlive];

        } while(playersAlive.length > 1);

        // console.log({story: resultsArray, winner: playersAlive});

        return({story: resultsArray, winner: playersAlive});
    }


    randomize = (total) => {
        return Math.floor(Math.random() * total);
    }

    probabilityFatal = function(percentage) {
        return !!percentage && Math.random() <= percentage;
    };

    day = (dayControl) => {
        let isFatal = this.probabilityFatal(.2); // 20% de morte

        if(dayControl > 5){
            isFatal = this.probabilityFatal(.25); // 25% de morte
            if(dayControl > 10) {
                isFatal = this.probabilityFatal(.3); // 30% de morte
            }
        }

        let event = '';
        let eventNumber = 0;

        if(!isFatal){
            eventNumber = this.randomize(ChiquinhaEvents.falas.length);
            event = ChiquinhaEvents.falas[eventNumber];
        } else {
            eventNumber = this.randomize(ChiquinhaEvents.morte.length);
            event = ChiquinhaEvents.morte[eventNumber];
        }

        return({isFatal: isFatal, eventNumber: eventNumber, event: event});
    }
}

export default (new ChiquinhaLogic());