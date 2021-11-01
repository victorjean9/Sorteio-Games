
class HungerGamesEvents {
    
    bloodbath = (event) => {
        switch (event) {
            case 0:
                return({ tributes: 1, text: "(Jogador1) pega uma pá."});
            case 1:
                return({ tributes: 1, text: "(Jogador1) pega uma mochila e se retira."});
            case 2:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) lutam por uma bolsa. (Jogador1) desiste e recua."});
            case 3:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) lutam por uma bolsa. (Jogador2) desiste e recua."});
            case 4:
                return({ tributes: 1, text: "(Jogador1) encontra um arco, algumas flechas e uma aljava."});
            case 5:
                return({ tributes: 1, text: "(Jogador1) corre para a cornucópia e se esconde."});
            case 6:
                return({ tributes: 1, text: "(Jogador1) pega um punhado de facas de arremesso."});
            case 7:
                return({ tributes: 2, text: "(Jogador1) arranca uma maça das mãos de (Jogador2)."});
            case 8:
                return({ tributes: 1, text: "(Jogador1) encontra um cantil cheio de água."});
            case 9:
                return({ tributes: 1, text: "(Jogador1) fica na cornucópia em busca de recursos."});
            case 10:
                return({ tributes: 1, text: "(Jogador1) recolhe o máximo de comida que consegue."});
            case 11:
                return({ tributes: 1, text: "(Jogador1) pega uma espada."});
            case 12:
                return({ tributes: 1, text: "(Jogador1) pega uma lança de dentro da cornucópia."});
            case 13:
                return({ tributes: 1, text: "(Jogador1) encontra um saco cheio de explosivos."});
            case 14:
                return({ tributes: 1, text: "(Jogador1) agarra um kit de primeiros socorros e foge."});
            case 15:
                return({ tributes: 1, text: "(Jogador1) pega uma foice de dentro da cornucópia."});
            case 16:
                return({ tributes: 3, text: "(Jogador1), (Jogador2) e (Jogador3) trabalham juntos para obter o máximo de suprimentos possível."});
            case 17:
                return({ tributes: 1, text: "(Jogador1) foge com um isqueiro e um pouco de corda."});
            case 18:
                return({ tributes: 1, text: "(Jogador1) agarra uma garrafa de álcool e um trapo."});            
            case 19:
                return({ tributes: 1, text: "(Jogador1) encontra uma mochila cheia de equipamentos de camping."});
            case 20:
                return({ tributes: 1, text: "(Jogador1) pega uma mochila, sem perceber que está vazia."});
            case 21:
                return({ tributes: 2, text: "(Jogador1) quebra o nariz de (Jogador2) com uma cesta de pão."});
            case 22:
                return({ tributes: 4, text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) compartilham tudo o que reuniram antes de correr."});
            case 23:
                return({ tributes: 1, text: "(Jogador1) recupera um tridente de dentro da cornucópia."});
            case 24:
                return({ tributes: 2, text: "(Jogador1) pega um pote de isca enquanto (Jogador2) pega o equipamento de pesca."});
            case 25:
                return({ tributes: 2, text: "(Jogador1) afasta (Jogador2) da cornucópia."});
            case 26:
                return({ tributes: 1, text: "(Jogador1) agarra um escudo encostado na cornucópia."});
        
            default:
                return({ tributes: 1, text: "(Jogador1) agarra um par de adagas."});
        }
    }
    
    day = (event) => {
        switch (event) {
            case 0:
                return({ tributes: 1, text: "(Jogador1) vai caçar."});
            case 1:
                return({ tributes: 1, text: "(Jogador1) se machuca."});
            case 2:
                return({ tributes: 1, text: "(Jogador1) explora a arena."});
            case 3:
                return({ tributes: 2, text: "(Jogador1) assusta (Jogador2)."});
            case 4:
                return({ tributes: 2, text: "(Jogador1) desvia a atenção de (Jogador2) e foge."});
            case 5:
                return({ tributes: 2, text: "(Jogador1) espreita (Jogador2)."});
            case 6:
                return({ tributes: 1, text: "(Jogador1) pesca."});
            case 7:
                return({ tributes: 1, text: "(Jogador1) camufla-se nos arbustos."});
            case 8:
                return({ tributes: 2, text: "(Jogador1) vê que (Jogador2) está distraído e consegue roubar suas coisas."});
            case 9:
                return({ tributes: 1, text: "(Jogador1) faz uma lança de madeira."});
            case 10:
                return({ tributes: 1, text: "(Jogador1) descobre uma caverna."});
            case 11:
                return({ tributes: 2, text: "(Jogador1) ataca (Jogador2), entretanto (Jogador2) consegue escapar."});
            case 12:
                return({ tributes: 2, text: "(Jogador1) persegue (Jogador2)."});
            case 13:
                return({ tributes: 2, text: "(Jogador1) foge de (Jogador2)."});
            case 14:
                return({ tributes: 1, text: "(Jogador1) coleta frutas de uma árvore."});
            case 15:
                return({ tributes: 1, text: "(Jogador1) recebe um machado de um patrocinador desconhecido."});
            case 16:
                return({ tributes: 1, text: "(Jogador1) recebe água limpa de um patrocinador desconhecido."});
            case 17:
                return({ tributes: 1, text: "(Jogador1) recebe suprimentos médicos de um patrocinador desconhecido."});
            case 18:
                return({ tributes: 1, text: "(Jogador1) recebe comida fresca de um patrocinador desconhecido."});
            case 19:
                return({ tributes: 1, text: "(Jogador1) procura uma fonte de água."});
            case 20:
                return({ tributes: 2, text: "(Jogador1) derrota (Jogador2) em uma luta, mas poupa sua vida."});
            case 21:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) trabalham juntos durante o dia."});
            case 22:
                return({ tributes: 2, text: "(Jogador1) implora para (Jogador2) sua morte. Entretanto (Jogador2) se recusa, mantendo (Jogador1) vivo."});
            case 23:
                return({ tributes: 1, text: "(Jogador1) tenta dormir o dia todo."});
            case 24:
                return({ tributes: 5, text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) se aproveitam que (Jogador5) está caçando e invadem seu acampamento."});
            case 25:
                return({ tributes: 1, text: "(Jogador1) constrói uma cabana."});
            case 26:
                return({ tributes: 3, text: "(Jogador1) ouve (Jogador2) e (Jogador3) falando à distância."});
            case 27:
                return({ tributes: 1, text: "(Jogador1) pratica arco e flecha."});
            case 28:
                return({ tributes: 1, text: "(Jogador1) pensa em sua casa e em sua família."});
            case 29:
                return({ tributes: 1, text: "(Jogador1) se machuca com espinhos enquanto colhe bagas."});
            case 30:
                return({ tributes: 1, text: "(Jogador1) tenta pescar um peixe com uma lança."});
            case 31:
                return({ tributes: 1, text: "(Jogador1) procura por lenha."});
            case 32:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) se dividem para procurar recursos."});
            case 33:
                return({ tributes: 1, text: "(Jogador1) colhe flores."});
            case 34:
                return({ tributes: 2, text: "(Jogador1) cuida das feridas de (Jogador2)."});
            case 35:
                return({ tributes: 1, text: "(Jogador1) vê fumaça à distância, mas decide não investigar."});
            case 36:
                return({ tributes: 2, text: "(Jogador1) torce seu tornozelo enquanto foge de (Jogador2)."});
            case 37:
                return({ tributes: 1, text: "(Jogador1) pratica estilingue."});
            case 38:
                return({ tributes: 1, text: "(Jogador1) corre para um terreno mais alto."});
            case 39:
                return({ tributes: 1, text: "(Jogador1) descobre um rio."});
            case 40:
                return({ tributes: 1, text: "(Jogador1) caça outros tributos."});
            case 41:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) procuram outros tributos."});
            case 42:
                return({ tributes: 3, text: "(Jogador1), (Jogador2) e (Jogador3) procuram outros tributos."});
            case 43:
                return({ tributes: 4, text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) procuram outros tributos."});
            case 44:
                return({ tributes: 5, text: "(Jogador1), (Jogador2), (Jogador3), (Jogador4) e (Jogador5) procuram outros tributos."});
            case 45:
                return({ tributes: 1, text: "(Jogador1) recebe um explosivo de um patrocinador desconhecido."});
        
            default:
                return({ tributes: 1, text: "(Jogador1) questiona sua sanidade."});
        }
    }
    
    night = (event) => {
        switch (event) {
            case 0:
                return({ tributes: 1, text: "(Jogador1) inicia um incêndio."});
            case 1:
                return({ tributes: 1, text: "(Jogador1) monta acampamento para a noite."});            
            case 2:
                return({ tributes: 1, text: "(Jogador1) está perdido em meio a escuridão."});
            case 3:
                return({ tributes: 1, text: "(Jogador1) sobe em uma árvore para descansar."});
            case 4:
                return({ tributes: 1, text: "(Jogador1) vai dormir."});
            case 5:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) contam histórias sobre si mesmos."});
            case 6:
                return({ tributes: 4, text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) se dividem para dormir em turnos."});
            case 7:
                return({ tributes: 3, text: "(Jogador1), (Jogador2) e (Jogador3) se dividem para dormir em turnos."});
            case 8:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) se dividem para dormir em turnos."});
            case 9:
                return({ tributes: 1, text: "(Jogador1) tenta limpar suas feridas."});            
            case 10:
                return({ tributes: 1, text: "(Jogador1) vê um incêndio, mas permanece escondido."});            
            case 11:
                return({ tributes: 1, text: "(Jogador1) grita por ajuda."});
            case 12:
                return({ tributes: 1, text: "(Jogador1) fica acordado a noite toda."});
            case 13:
                return({ tributes: 1, text: "(Jogador1) desmaia de exaustão."});
            case 14:
                return({ tributes: 1, text: "(Jogador1) prepara sua comida antes que o fogo se apague."});
            case 15:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) se encontram e decidem trégua pela noite."});
            case 16:
                return({ tributes: 4, text: "(Jogador1) protege (Jogador2), (Jogador3) e (Jogador4) de um incêndio."});
            case 17:
                return({ tributes: 3, text: "(Jogador1), (Jogador2) e (Jogador3) discutem os jogos e o que pode acontecer pela manhã."});
            case 18:
                return({ tributes: 1, text: "(Jogador1) chora ao tentar dormir."});            
            case 19:
                return({ tributes: 1, text: "(Jogador1) tenta tratar a sua infecção."});
            case 20:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) falam sobre os tributos ainda vivos."});
            case 21:
                return({ tributes: 1, text: "(Jogador1) é acordado por pesadelos."});
            case 22:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) se juntam para se aquecer."});
            case 23:
                return({ tributes: 1, text: "(Jogador1) pensa em ganhar."});
            case 24:
                return({ tributes: 4, text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) contam histórias de fantasmas entre si na tentativa de deixar o clima mais agradável."});
            case 25:
                return({ tributes: 1, text: "(Jogador1) olha para o céu noturno."});
            case 26:
                return({ tributes: 2, text: "(Jogador1) derrota (Jogador2) em uma luta, mas poupa sua vida."});
            case 27:
                return({ tributes: 2, text: "(Jogador1) implora para (Jogador2) sua morte. Entretanto (Jogador2) se recusa, mantendo (Jogador1) vivo."});
            case 28:
                return({ tributes: 2, text: "(Jogador1) se aproveita que (Jogador2) está dormindo e destrói seus suprimentos."});            
            case 29:
                return({ tributes: 5, text: "(Jogador1), (Jogador2), (Jogador3), (Jogador4) e (Jogador5) se dividem para dormir em turnos."});
            case 30:
                return({ tributes: 2, text: "(Jogador1) deixa (Jogador2) entrar em seu abrigo."});
            case 31:
                return({ tributes: 1, text: "(Jogador1) recebe um machado de um patrocinador desconhecido."});            
            case 32:
                return({ tributes: 1, text: "(Jogador1) recebe água limpa de um patrocinador desconhecido."});
            case 33:
                return({ tributes: 1, text: "(Jogador1) recebe suprimentos médicos de um patrocinador desconhecido."});
            case 34:
                return({ tributes: 1, text: "(Jogador1) recebe comida fresca de um patrocinador desconhecido."});
            case 35:
                return({ tributes: 1, text: "(Jogador1) tenta cantar para dormir."});
            case 36:
                return({ tributes: 1, text: "(Jogador1) tenta iniciar um incêndio, mas não tem sucesso."});
            case 37:
                return({ tributes: 1, text: "(Jogador1) pensa em sua casa e em sua familia."});
            case 38:
                return({ tributes: 2, text: "(Jogador1) cuida das feridas de (Jogador2)."});
            case 39:
                return({ tributes: 1, text: "(Jogador1) cantarola baixinho."});            
            case 40:
                return({ tributes: 3, text: "(Jogador1), (Jogador2) e (Jogador3) cantam canções alegremente juntos."});            
            case 41:
                return({ tributes: 1, text: "(Jogador1) não consegue acender o fogo e dorme sem aquecimento."});
            case 42:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) estão de mãos dadas."});
            case 43:
                return({ tributes: 2, text: "(Jogador1) convence (Jogador2) para dormirem juntos."});
            case 44:
                return({ tributes: 1, text: "(Jogador1) recebe um explosivo de um patrocinador desconhecido."});
        
            default:
                return({ tributes: 1, text: "(Jogador1) questiona sua sanidade."});
        }
    }
    
    feast = (event) => {
        switch (event) {
            case 0:
                return({ tributes: 1, text: "(Jogador1) reúne em uma sacola o máximo de comida que consegue antes de fugir."});
            case 1:
                return({ tributes: 1, text: "(Jogador1) soluça enquanto segura uma foto de seus amigos e familiares."});            
            case 2:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) decidem trabalhar juntos para conseguir mais suprimentos."});
            case 3:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) brigam por carne crua, mas (Jogador2) desiste e foge."});
            case 4:
                return({ tributes: 2, text: "(Jogador1) e (Jogador2) brigam por carne crua, mas (Jogador1) desiste e foge."});
            case 5:
                return({ tributes: 3, text: "(Jogador1), (Jogador2) e (Jogador3) se confrontam, mas pegam o que eles querem devagar para evitar conflito."});
            case 6:
                return({ tributes: 2, text: "(Jogador1) destrói as memórias de (Jogador2) para afrontar."});
            case 7:
                return({ tributes: 4, text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) se unem para pegar comida, suprimentos, armas e memórias."});
            case 8:
                return({ tributes: 2, text: "(Jogador1) rouba as memórias de (Jogador2)."});
            case 9:
                return({ tributes: 1, text: "(Jogador1) pega um bastão encostado na cornucópia."});            
        
            default:
                return({ tributes: 1, text: "(Jogador1) coloca um pacote de roupas secas em uma mochila antes de sair correndo."});
        }
    }
    
    arena = (event) => {
        switch (event) {
            case 0:
                return({ tributes: null, text: ""});
            case 1:
                return({ tributes: null, text: ""});            
            case 2:
                return({ tributes: null, text: ""});
            case 3:
                return({ tributes: null, text: ""});
            case 4:
                return({ tributes: null, text: ""});
            case 5:
                return({ tributes: null, text: ""});
            case 6:
                return({ tributes: null, text: ""});
            case 7:
                return({ tributes: null, text: ""});
            case 8:
                return({ tributes: null, text: ""});
            case 9:
                return({ tributes: null, text: ""});            
            case 10:
                return({ tributes: null, text: ""});            
            case 11:
                return({ tributes: null, text: ""});
            case 12:
                return({ tributes: null, text: ""});
        
            default:
                return({ tributes: null, text: ""});
        }
    }

    bloodbathFatal = (event) => {
        switch (event) {
            case 0:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) sai do seu pódio antes do tempo e se explode."});
            case 1:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) joga uma faca na cabeça de (Jogador2)."});            
            case 2:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) acidentalmente pisa em uma mina terrestre."});
            case 3:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) em um momento desprevenido."});
            case 4:
                return({ tributes: 3, deaths: [3], text: "(Jogador1) e (Jogador2) trabalham juntos para afogar (Jogador3)."});
            case 5:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) estrangula (Jogador2) depois de se envolver em uma briga."});
            case 6:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) atira uma flecha na cabeça de (Jogador2)."});
            case 7:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) não consegue lidar com as circunstâncias e comete suicídio."});
            case 8:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) bate a cabeça de (Jogador2) contra uma pedra várias vezes."});
            case 9:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) enforca (Jogador2)."});            
            case 10:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) decapita (Jogador2) com uma espada."});            
            case 11:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma lança no abdômen."});
            case 12:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) incendeia (Jogador2) com um molotov."});
            case 13:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) cai em um buraco e morre."});
            case 14:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) enquanto está de costas."});
            case 15:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) e esconde o corpo."});
            case 16:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) fere gravemente (Jogador2), deixando sua morte ocorrer lentamente."});
            case 17:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) acerta a cabeça de (Jogador2) com uma maça."});
            case 18:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) empurra (Jogador2) de um penhasco durante uma luta com facas."});            
            case 19:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) joga uma faca no peito de (Jogador2)."});
            case 20:
                return({ tributes: 2, deaths: [1], text: "(Jogador1) implora por sua vida para (Jogador2). Que não atende ao seu pedido e mata (Jogador1) a sangue frio."});
            case 21:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) implora por sua vida para (Jogador2). Que atende ao seu pedido, mas é traido e morto por (Jogador1)."});
            case 22:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) cai em um lago congelado e se afoga."});
            case 23:
                return({ tributes: 3, deaths: [3], text: "(Jogador1), (Jogador2) e (Jogador3) começam a lutar, mas (Jogador2) foge enquanto (Jogador1) mata (Jogador3)."});
            case 24:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com sua própria arma."});
            case 25:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) imobiliza e mata (Jogador2)."});
            case 26:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) dispara um explosivo, matando (Jogador2)."});
            case 27:
                return({ tributes: 3, deaths: [2, 3], text: "(Jogador1) dispara um explosivo, matando (Jogador2) e (Jogador3)."});
            case 28:
                return({ tributes: 4, deaths: [2, 3, 4], text: "(Jogador1) dispara um explosivo, matando (Jogador2), (Jogador3) e (Jogador4)."});            
            case 29:
                return({ tributes: 5, deaths: [2, 3, 4, 5], text: "(Jogador1) dispara um explosivo, matando (Jogador2), (Jogador3), (Jogador4) e (Jogador5)."});
            case 30:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) enquanto tenta correr."});
            case 31:
                return({ tributes: 2, deaths: [1, 2], text: "(Jogador1) e (Jogador2) cometem um suicídio duplo."});            
            case 32:
                return({ tributes: 4, deaths: [1, 2, 3, 4], text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) fazem um pacto suicida, matando-se."});
            case 33:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma machadinha."});
            case 34:
                return({ tributes: 4, deaths: [3, 4], text: "(Jogador1) e (Jogador2) lutam contra (Jogador3) e (Jogador4). (Jogador1) e (Jogador2) sobrevivem."});
            case 35:
                return({ tributes: 4, deaths: [1, 2], text: "(Jogador1) e (Jogador2) lutam contra (Jogador3) e (Jogador4). (Jogador3) e (Jogador4) sobrevivem."});
            case 36:
                return({ tributes: 3, deaths: [1], text: "(Jogador1) ataca (Jogador2), mas (Jogador3) protege (Jogador2), matando (Jogador1)."});
            case 37:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) corta severamente (Jogador2) com uma espada."});
            case 38:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) estrangula (Jogador2) com uma corda."});
            case 39:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) para roubar seus suprimentos."});            
            case 40:
                return({ tributes: 3, deaths: [3], text: "(Jogador1) atira uma flecha em (Jogador2), mas erra e mata (Jogador3)."});            
            case 41:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) atira um dardo venenoso no pescoço de (Jogador2), matando lentamente."});
            case 42:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) com um galho de árvore."});
            case 43:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) nas costas com um tridente."});
            case 44:
                return({ tributes: 3, deaths: [2, 3], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador1) mata os dois triunfantemente."});
            case 45:
                return({ tributes: 3, deaths: [1, 3], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador2) mata os dois triunfantemente."});
            case 46:
                return({ tributes: 3, deaths: [1, 2], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador3) mata os dois triunfantemente."});
            case 47:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) encontra e mata (Jogador2) que estava escondido na Cornucópia."});
            case 48:
                return({ tributes: 2, deaths: [1], text: "(Jogador1) encontra e morre para (Jogador2) que estava escondido na Cornucópia."});            
            case 49:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma foice."});
            case 50:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) e (Jogador2) lutam por uma bolsa. (Jogador1) estrangula (Jogador2) com as correias e corre."});
            case 51:
                return({ tributes: 2, deaths: [1], text: "(Jogador1) e (Jogador2) lutam por uma bolsa. (Jogador2) estrangula (Jogador1) com as correias e corre."});
        
            default:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia repetidamente (Jogador2) até a morte com um par de adagas."});
        }
    }

    dayAndNightFatal = (event) => {
        switch (event) {
            case 0:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) em um momento desprevenido."});
            case 1:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) joga uma faca na cabeça de (Jogador2)."});            
            case 2:
                return({ tributes: 2, deaths: [1], text: "(Jogador1) implora sua morte para (Jogador2). Com relutância, (Jogador2) mata (Jogador1)."});
            case 3:
                return({ tributes: 2, deaths: [1, 2], text: "(Jogador1) e (Jogador2) trabalham juntos para se afogar."});
            case 4:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) estrangula (Jogador2) depois de se envolver em uma briga."});
            case 5:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) atira uma flecha na cabeça de (Jogador2)."});
            case 6:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) sangra até a morte devido a lesões não tratadas."});
            case 7:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) não consegue lidar com as circunstâncias e comete suicídio."});
            case 8:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) bate a cabeça de (Jogador2) contra uma pedra várias vezes."});
            case 9:
                return({ tributes: 1, deaths: [1], text: "(Jogador1), sem saber, come frutas tóxicas."});            
            case 10:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) silenciosamente enforca (Jogador2)."});            
            case 11:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) contamina a comida do (Jogador2), que morre ao comer."});
            case 12:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) decapita (Jogador2) com uma espada."});
            case 13:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) morre de uma infecção."});
            case 14:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma lança no abdômen."});
            case 15:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) incendeia (Jogador2) com um molotov."});
            case 16:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) cai em um buraco e morre."});
            case 17:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) enquanto está de costas."});
            case 18:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) e esconde o corpo."});            
            case 19:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) fere gravemente (Jogador2), deixando sua morte ocorrer lentamente."});
            case 20:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) acerta a cabeça de (Jogador2) com uma maça."});
            case 21:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) tenta subir em uma árvore, mas cai e morre."});
            case 22:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) empurra (Jogador2) de um penhasco durante uma luta com facas."});
            case 23:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) joga uma faca no peito de (Jogador2)."});
            case 24:
                return({ tributes: 2, deaths: [2], text: "A armadilha do (Jogador1) mata (Jogador2)."});
            case 25:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) enquanto está descansando."});
            case 26:
                return({ tributes: 2, deaths: [1], text: "(Jogador1) implora por sua vida para (Jogador2). Que não atende ao seu pedido e mata (Jogador1) a sangue frio."});
            case 27:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) implora por sua vida para (Jogador2). Que atende ao seu pedido, mas é traido e morto por (Jogador1)."});
            case 28:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) cai em um lago congelado e se afoga."});            
            case 29:
                return({ tributes: 3, deaths: [3], text: "(Jogador1), (Jogador2) e (Jogador3) começam a lutar, mas (Jogador2) foge enquanto (Jogador1) mata (Jogador3)."});
            case 30:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com sua própria arma."});
            case 31:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) imobiliza e mata (Jogador2)."});
            case 32:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) dispara um explosivo, matando (Jogador2)."});
            case 33:
                return({ tributes: 3, deaths: [2, 3], text: "(Jogador1) dispara um explosivo, matando (Jogador2) e (Jogador3)."});
            case 34:
                return({ tributes: 4, deaths: [2, 3, 4], text: "(Jogador1) dispara um explosivo, matando (Jogador2), (Jogador3) e (Jogador4)."});            
            case 35:
                return({ tributes: 5, deaths: [2, 3, 4, 5], text: "(Jogador1) dispara um explosivo, matando (Jogador2), (Jogador3), (Jogador4) e (Jogador5)."});
            case 36:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) enquanto tenta correr."});
            case 37:
                return({ tributes: 2, deaths: [1, 2], text: "(Jogador1) e (Jogador2) cometem um suicídio duplo."});            
            case 38:
                return({ tributes: 4, deaths: [1, 2, 3, 4], text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) fazem um pacto suicida, matando-se."});
            case 39:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) morre de hipotermia."});            
            case 40:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) morre de fome."});            
            case 41:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) morre de sede."});
            case 42:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma machadinha."});
            case 43:
                return({ tributes: 4, deaths: [3, 4], text: "(Jogador1) e (Jogador2) lutam contra (Jogador3) e (Jogador4). (Jogador1) e (Jogador2) sobrevivem."});
            case 44:
                return({ tributes: 4, deaths: [1, 2], text: "(Jogador1) e (Jogador2) lutam contra (Jogador3) e (Jogador4). (Jogador3) e (Jogador4) sobrevivem."});
            case 45:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) morre tentando escapar da arena."});
            case 46:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) morre de disenteria."});
            case 47:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) acidentalmente detona uma mina terrestre enquanto tenta armá-la."});
            case 48:
                return({ tributes: 3, deaths: [1], text: "(Jogador1) ataca (Jogador2), mas (Jogador3) protege (Jogador2), matando (Jogador1)."});            
            case 49:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) embosca e mata (Jogador2)."});
            case 50:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) acidentalmente pisa em uma mina terrestre."});
            case 51:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) corta severamente (Jogador2) com uma espada."});
            case 52:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) estrangula (Jogador2) com uma corda."});
            case 53:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) para roubar seus suprimentos."});
            case 54:
                return({ tributes: 3, deaths: [3], text: "(Jogador1) atira uma flecha em (Jogador2), mas erra e mata (Jogador3)."});
            case 55:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) atira um dardo venenoso no pescoço de (Jogador2), que morre lentamente."});
            case 56:
                return({ tributes: 6, deaths: [4, 5, 6], text: "(Jogador1), (Jogador2) e (Jogador3) emboscam e matam com sucesso (Jogador4), (Jogador5) e (Jogador6)."});
            case 57:
                return({ tributes: 6, deaths: [1 ,2, 3], text: "(Jogador1), (Jogador2) e (Jogador3) emboscam sem sucesso e morrem para (Jogador4), (Jogador5) e (Jogador6)."});
            case 58:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) com um galho de árvore."});            
            case 59:
                return({ tributes: 4, deaths: [3], text: "(Jogador1) força (Jogador2) a matar (Jogador3) ou (Jogador4). (Jogador2) decide matar (Jogador3)."});
            case 60:
                return({ tributes: 4, deaths: [4], text: "(Jogador1) força (Jogador2) a matar (Jogador3) ou (Jogador4). (Jogador2) decide matar (Jogador4)."});
            case 61:
                return({ tributes: 4, deaths: [2], text: "(Jogador1) força (Jogador2) a matar (Jogador3) ou (Jogador4). (Jogador2) se recusa a matar, então (Jogador1) mata (Jogador2)."});            
            case 62:
                return({ tributes: 2, deaths: [1], text: "(Jogador1) envenena a bebida de (Jogador2), mas a confunde com a própria bebida e morre."});
            case 63:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) envenena a bebida do (Jogador2), que bebe e morre."});
            case 64:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) nas costas com um tridente."});
            case 65:
                return({ tributes: 2, deaths: [1, 2], text: "(Jogador1) tenta subir em uma árvore, mas cai em (Jogador2), matando os dois."});
            case 66:
                return({ tributes: 3, deaths: [2, 3], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador1) mata os dois triunfantemente."});
            case 67:
                return({ tributes: 3, deaths: [1, 3], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador2) mata os dois triunfantemente."});
            case 68:
                return({ tributes: 3, deaths: [1, 2], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador3) mata os dois triunfantemente."});
            case 69:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma foice."});            
            case 70:
                return({ tributes: 6, deaths: [6], text: "(Jogador1), (Jogador2), (Jogador3), (Jogador4) e (Jogador5) perseguem e matam (Jogador6)."});            
            case 71:
                return({ tributes: 5, deaths: [5], text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) perseguem e matam (Jogador5)."});
            case 72:
                return({ tributes: 4, deaths: [4], text: "(Jogador1), (Jogador2) e (Jogador3) perseguem e matam (Jogador4)."});
            case 73:
                return({ tributes: 3, deaths: [3], text: "(Jogador1) e (Jogador2) perseguem e matam (Jogador3)."});
            case 74:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) persegue e mata (Jogador2)."});
        
            default:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia repetidamente (Jogador2) até a morte com um par de adagas."});
        }
    }

    feastFatal = (event) => {
        switch (event) {
            case 0:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) joga uma faca na cabeça de (Jogador2)."});
            case 1:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) acidentalmente pisa em uma mina terrestre."});            
            case 2:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) em um momento desprevenido."});
            case 3:
                return({ tributes: 3, deaths: [3], text: "(Jogador1) e (Jogador2) trabalham juntos para afogar (Jogador3)."});
            case 4:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) estrangula (Jogador2) depois de se envolver em uma briga."});
            case 5:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) atira uma flecha na cabeça de (Jogador2)."});
            case 6:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) sangra devido a lesões não tratadas."});
            case 7:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) não consegue lidar com as circunstâncias e comete suicídio."});
            case 8:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) bate a cabeça de (Jogador2) contra uma pedra várias vezes."});
            case 9:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) enforca (Jogador2)."});            
            case 10:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) decapita (Jogador2) com uma espada."});            
            case 11:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) morre de uma infecção."});
            case 12:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma lança no abdômen."});
            case 13:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) incendeia (Jogador2) com um molotov."});
            case 14:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) cai em um buraco e morre."});
            case 15:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) enquanto está de costas."});
            case 16:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) e esconde o corpo."});
            case 17:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) fere gravemente (Jogador2), deixando sua morte ocorrer lentamente."});
            case 18:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) acerta a cabeça de (Jogador2) com uma maça."});            
            case 19:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) empurra (Jogador2) de um penhasco durante uma luta com facas."});
            case 20:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) joga uma faca no peito de (Jogador2)."});
            case 21:
                return({ tributes: 2, deaths: [2], text: "A armadilha do (Jogador1) mata (Jogador2)."});
            case 22:
                return({ tributes: 2, deaths: [1], text: "(Jogador1) implora por sua vida para (Jogador2). Que não atende ao seu pedido e mata (Jogador1) a sangue frio."});
            case 23:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) implora por sua vida para (Jogador2). Que atende ao seu pedido, mas é traido e morto por (Jogador1)."});
            case 24:
                return({ tributes: 1, deaths: [1], text: "(Jogador1) cai em um lago congelado e se afoga."});
            case 25:
                return({ tributes: 3, deaths: [3], text: "(Jogador1), (Jogador2) e (Jogador3) começam a lutar, mas (Jogador2) foge enquanto (Jogador1) mata (Jogador3)."});
            case 26:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com sua própria arma."});
            case 27:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) embosca e mata (Jogador2)."});
            case 28:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) dispara um explosivo, matando (Jogador2)."});            
            case 29:
                return({ tributes: 3, deaths: [2, 3], text: "(Jogador1) dispara um explosivo, matando (Jogador2) e (Jogador3)."});
            case 30:
                return({ tributes: 4, deaths: [2, 3, 4], text: "(Jogador1) dispara um explosivo, matando (Jogador2), (Jogador3) e (Jogador4)."});
            case 31:
                return({ tributes: 5, deaths: [2, 3, 4, 5], text: "(Jogador1) dispara um explosivo, matando (Jogador2), (Jogador3), (Jogador4) e (Jogador5)."});            
            case 32:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) enquanto tenta correr."});
            case 33:
                return({ tributes: 2, deaths: [1, 2], text: "(Jogador1) e (Jogador2) cometem um suicídio duplo."});
            case 34:
                return({ tributes: 4, deaths: [1, 2, 3, 4], text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) fazem um pacto suicida, matando-se."});
            case 35:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma machadinha."});
            case 36:
                return({ tributes: 4, deaths: [3, 4], text: "(Jogador1) e (Jogador2) lutam (Jogador3) e (Jogador4). (Jogador1) e (Jogador2) sobrevivem."});
            case 37:
                return({ tributes: 4, deaths: [1, 2], text: "(Jogador1) e (Jogador2) lutam (Jogador3) e (Jogador4). (Jogador3) e (Jogador4) sobrevivem."});
            case 38:
                return({ tributes: 3, deaths: [1], text: "(Jogador1) ataca (Jogador2), mas (Jogador3) protege (Jogador2), matando (Jogador1)."});
            case 39:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) embosca e mata (Jogador2)."});            
            case 40:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) corta severamente (Jogador2) com uma espada."});            
            case 41:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) estrangula (Jogador2) com uma corda."});
            case 42:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) para roubar seus suprimentos."});
            case 43:
                return({ tributes: 3, deaths: [3], text: "(Jogador1) atira uma flecha em (Jogador2), mas erra e mata (Jogador3)."});
            case 44:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) atira um dardo venenoso no pescoço de (Jogador2), matando lentamente."});
            case 45:
                return({ tributes: 6, deaths: [4, 5, 6], text: "(Jogador1), (Jogador2) e (Jogador3) emboscam e matam com sucesso (Jogador4), (Jogador5) e (Jogador6)."});
            case 46:
                return({ tributes: 6, deaths: [1, 2, 3], text: "(Jogador1), (Jogador2) e (Jogador3) emboscam sem sucesso e são mortos por (Jogador4), (Jogador5) e (Jogador6)."});
            case 47:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) com um galho de árvore."});
            case 48:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia (Jogador2) nas costas com um tridente."});            
            case 49:
                return({ tributes: 3, deaths: [2, 3], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador1) mata os dois triunfantemente."});
            case 50:
                return({ tributes: 3, deaths: [1, 3], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador2) mata os dois triunfantemente."});
            case 51:
                return({ tributes: 3, deaths: [1, 2], text: "(Jogador1), (Jogador2) e (Jogador3) entram em uma luta. (Jogador3) mata os dois triunfantemente."});
            case 52:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) mata (Jogador2) com uma foice."});
            case 53:
                return({ tributes: 6, deaths: [6], text: "(Jogador1), (Jogador2), (Jogador3), (Jogador4) e (Jogador5) perseguem e matam (Jogador6)."});
            case 54:
                return({ tributes: 5, deaths: [5], text: "(Jogador1), (Jogador2), (Jogador3) e (Jogador4) perseguem e matam (Jogador5)."});
            case 55:
                return({ tributes: 4, deaths: [4], text: "(Jogador1), (Jogador2) e (Jogador3) perseguem e matam (Jogador4)."});
            case 56:
                return({ tributes: 3, deaths: [3], text: "(Jogador1) e (Jogador2) perseguem e matam (Jogador3)."});
            case 57:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) persegue e mata (Jogador2)."});
        
            default:
                return({ tributes: 2, deaths: [2], text: "(Jogador1) esfaqueia repetidamente (Jogador2) até a morte com um par de adagas."});
        }
    }
}

export default (new HungerGamesEvents());