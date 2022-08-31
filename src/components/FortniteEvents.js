class FortniteEvents {

    armas = [
        'uma Pistoa Auxiliar',
        'um Revólver',
        'uma Espingarda Automática',
        'uma Espingarda de Dois Tiros',
        'uma Escopeta Atacante',
        'uma SMG Ferrão',
        'uma SMG de Combate',
        'um Rifle de Assalto do Guarda',
        'um Rifle de Assalto Martelo',
        'um Rifle de Rjada Atacante',
        'um Rifle de Precisão Pesado',
        'um Rifle Atirador de Elite',
        'uma Granada',
        'um Vidro de Vagalumes',
        'um Arpão',
        'um Rastreador de Sombras',
        'um Revólver de Seis Tiros Preciso',
        'A Batida',
        'um Rifle de Precisão Fumegante',
        'um Limpa Trilhos'
    ]
    
    normal = [
        //{ players: 1, text: `(Jogador1) `},
        { players: 1, weapons: 0, text: `(Jogador1) está passando por cima do loot deixado por algum jogador eliminado.`},
        { players: 1, weapons: 0, text: `(Jogador1) está coletando madeira.`},
        { players: 1, weapons: 0, text: `(Jogador1) está coletando pedra.`},
        { players: 1, weapons: 0, text: `(Jogador1) está coletando metal.`},
        { players: 1, weapons: 0, text: `(Jogador1) está pescando.`},
        { players: 1, weapons: 0, text: `(Jogador1) está fazendo uma missão diária.`},
        { players: 1, weapons: 0, text: `(Jogador1) está fazendo uma missão semanal.`},
        { players: 1, weapons: 0, text: `(Jogador1) está tomando um mini escudo.`},
        { players: 1, weapons: 0, text: `(Jogador1) está tomando um escudo grande.`},
        { players: 1, weapons: 0, text: `(Jogador1) está se curando com atadura.`},
        { players: 1, weapons: 0, text: `(Jogador1) está se curando com um spray.`},
        { players: 1, weapons: 0, text: `(Jogador1) está se curando com kit médico.`},
        { players: 1, weapons: 0, text: `(Jogador1) está escondido em uma moita.`},
        { players: 1, weapons: 0, text: `(Jogador1) está escondido em um banheiro químico.`},
        { players: 1, weapons: 0, text: `(Jogador1) está escondido em um carro.`},
        { players: 1, weapons: 0, text: `(Jogador1) está escondido em um caminhão.`},
        { players: 1, weapons: 0, text: `(Jogador1) está correndo pelo mapa a procura de algum oponente.`},
        { players: 1, weapons: 0, text: `(Jogador1) está tentando domar um animal.`},
        { players: 1, weapons: 0, text: `(Jogador1) está abrindo um drop.`},
        { players: 2, weapons: 0, text: `(Jogador1) encontrou (Jogador2) mas evitou confronto.`},
        { players: 2, weapons: 0, text: `(Jogador1) encontrou (Jogador2) e tentou fazer amizade, mas não obteve sucesso.`},
        { players: 2, weapons: 0, text: `(Jogador1) encontrou (Jogador2) e tentou fazer amizade, entretanto teve que fugir de (Jogador2) que iniciou um confronto.`},
        { players: 2, weapons: 0, text: `(Jogador1) encontrou (Jogador2) e tentou fazer amizade, entretanto (Jogador2) fugiu de (Jogador1) temendo um confronto.`},
        { players: 2, weapons: 0, text: `(Jogador1) inicia um confronto com (Jogador2), mas após perder quase toda sua vida, foge do confronto com uma fenda portátil.`},
        { players: 2, weapons: 0, text: `(Jogador1) inicia um confronto com (Jogador2), mas (Jogador2) após perder quase toda sua vida, foge do confronto com uma fenda portátil.`},
        { players: 2, weapons: 0, text: `(Jogador1) inicia um confronto com (Jogador2), mas após perder quase toda sua vida, foge do confronto com uma grandada de onda de choque.`},
        { players: 2, weapons: 0, text: `(Jogador1) inicia um confronto com (Jogador2), mas (Jogador2) após perder quase toda sua vida, foge do confronto com uma grandada de onda de choque.`},
        
        { players: 2, weapons: 0, text: `(Jogador1) e (Jogador2) estão batalhando, mas (Jogador2) jogou uma Granada Boogie-Woogie tão perto que ambos estão dançando.`},
        { players: 2, weapons: 0, text: `(Jogador1) e (Jogador2) estão batalhando, mas (Jogador1) jogou uma Granada Boogie-Woogie tão perto que ambos estão dançando.`},
    ];

    drop = [
        { players: 1, weapons: 0, text: `(Jogador1) caiu em um local do mapa que não possui nenhum tipo de loot.`},
        { players: 1, weapons: 0, text: `(Jogador1) caiu no mar.`},
        { players: 1, weapons: 0, text: `(Jogador1) conseguiu cair sozinho no local que escolheu.`},
        { players: 2, weapons: 0, text: `(Jogador1) caiu numa casa perto de (Jogador2).`},
        { players: 2, weapons: 0, text: `(Jogador1) seguiu (Jogador2) para tentar sua primeira eliminação.`},
        { players: 4, weapons: 0, text: `(Jogador1), (Jogador2), (Jogador3) e (Jogador4) caem no mesmo local e com isso acabaram disputando o loot.`},
    ];

    mortesNoDrop = [
        { players: 1, weapons: 1, deaths: [1], text: `(Jogador1) caiu em um local alto e se eliminou por queda ao tentar descer.`},
        { players: 2, weapons: 1, deaths: [2], text: `(Jogador1) e (Jogador2) caíram na mesma casa. Entretanto (Jogador1) encontrou (Arma1) primeiro e conseguiu eliminar (Jogador2).`},
        { players: 2, weapons: 1, deaths: [1], text: `(Jogador1) e (Jogador2) caíram na mesma casa. Entretanto (Jogador2) encontrou (Arma1) primeiro e conseguiu eliminar (Jogador1).`},
        { players: 2, weapons: 1, deaths: [2], text: `(Jogador1) e (Jogador2) caíram no mesmo baú. Entretanto (Jogador1) conseguiu pegar (Arma1) primeiro e eliminou (Jogador2).`},
        { players: 2, weapons: 1, deaths: [1], text: `(Jogador1) e (Jogador2) caíram no mesmo baú. Entretanto (Jogador2) conseguiu pegar (Arma1) primeiro e eliminou (Jogador1).`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) encontra (Jogador2), e consegue eliminar (Jogador2) com sua picareta.`},
        { players: 2, weapons: 0, deaths: [1], text: `(Jogador1) encontra (Jogador2), mas (Jogador2) consegue eliminar (Jogador1) com sua picareta.`},
    ];

    mortes = [
        //{ players: 1, deaths: [1], text: `(Jogador1) .`},
        { players: 1, weapons: 0, deaths: [1], text: `(Jogador1) se perdeu na tempestade.`},
        { players: 1, weapons: 0, deaths: [1], text: `(Jogador1) se eliminou sem querer ao cair de um local alto.`},
        { players: 1, weapons: 0, deaths: [1], text: `(Jogador1) se eliminou sem querer ao cair de um local alto.`},
        { players: 2, weapons: 1, deaths: [2], text: `(Jogador1) encontra (Jogador2) e elimina (Jogador2) com (Arma1).`},
        { players: 2, weapons: 1, deaths: [1], text: `(Jogador1) encontra (Jogador2), inicia um confronto, mas (Jogador2) elimina (Jogador1) com (Arma1).`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) encontra (Jogador2), e consegue eliminar (Jogador2) com um arpão.`},
        { players: 2, weapons: 0, deaths: [1], text: `(Jogador1) encontrou (Jogador2) e tentou fazer amizade, mas (Jogador2) eliminou (Jogador1).`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) encontrou (Jogador2) e tentou fazer amizade, (Jogador2) aceita a amizade mas é traído por (Jogador1) que elimina (Jogador2).`},
        { players: 2, weapons: 0, deaths: [1, 2], text: `(Jogador1) encontrou (Jogador2) e ambos foram eliminados ao (Jogador1) jogar uma granada no local.`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) consegue eliminar (Jogador2) por queda ao quebrar sua box.`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) fecha (Jogador2) numa box e conseque eliminar (Jogador2).`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) rouba uma parede da box de (Jogador2) e consegue eliminar (Jogador2).`},
        { players: 2, weapons: 0, deaths: [1], text: `(Jogador1) rouba uma parede da box de (Jogador2), mas (Jogador2) conseque eliminar (Jogador1).`},
        { players: 3, weapons: 0, deaths: [1, 2], text: `(Jogador1) consegue eliminar (Jogador2), e comemora com uma dança, mas é eliminado logo em seguida por (Jogador3).`},
        { players: 3, weapons: 0, deaths: [1, 2], text: `(Jogador1) consegue eliminar (Jogador2), e comemora com a risada tóxica, mas é eliminado logo em seguida por (Jogador3).`},

        { players: 3, weapons: 0, deaths: [1, 2], text: `(Jogador1), (Jogador2) e (Jogador3) estão batalhando. (Jogador1) consegue eliminar (Jogador2), mas é eliminado logo em seguida por (Jogador3).`},
        { players: 3, weapons: 0, deaths: [1, 3], text: `(Jogador1), (Jogador2) e (Jogador3) estão batalhando. (Jogador1) consegue eliminar (Jogador3), mas é eliminado logo em seguida por (Jogador2).`},
        { players: 3, weapons: 0, deaths: [2, 3], text: `(Jogador1), (Jogador2) e (Jogador3) estão batalhando. (Jogador2) consegue eliminar (Jogador3), mas é eliminado logo em seguida por (Jogador1).`},
        { players: 3, weapons: 0, deaths: [1, 2], text: `(Jogador1), (Jogador2) e (Jogador3) estão batalhando. (Jogador2) consegue eliminar (Jogador1), mas é eliminado logo em seguida por (Jogador3).`},
        { players: 3, weapons: 0, deaths: [1, 3], text: `(Jogador1), (Jogador2) e (Jogador3) estão batalhando. (Jogador3) consegue eliminar (Jogador1), mas é eliminado logo em seguida por (Jogador2).`},
        { players: 3, weapons: 0, deaths: [2, 3], text: `(Jogador1), (Jogador2) e (Jogador3) estão batalhando. (Jogador3) consegue eliminar (Jogador2), mas é eliminado logo em seguida por (Jogador1).`},
        { players: 3, weapons: 0, deaths: [1, 2], text: `(Jogador1) e (Jogador2) estão batalhando. (Jogador3) avista a batalha e espera ela terminar para atacar. (Jogador1) elimina (Jogador2) e em seguida (Jogador3) aparece e consegue eliminar (Jogador1).`},
        { players: 3, weapons: 0, deaths: [2, 3], text: `(Jogador1) e (Jogador2) estão batalhando. (Jogador3) avista a batalha e espera ela terminar para atacar. (Jogador1) elimina (Jogador2) e em seguida (Jogador3) aparece mas é eliminado por (Jogador1).`},
        { players: 3, weapons: 0, deaths: [1, 2], text: `(Jogador1) e (Jogador2) estão batalhando. (Jogador3) avista a batalha e espera ela terminar para atacar. (Jogador2) elimina (Jogador1) e em seguida (Jogador3) aparece e consegue eliminar (Jogador2).`},
        { players: 3, weapons: 0, deaths: [1, 3], text: `(Jogador1) e (Jogador2) estão batalhando. (Jogador3) avista a batalha e espera ela terminar para atacar. (Jogador2) elimina (Jogador1) e em seguida (Jogador3) aparece mas é eliminado por (Jogador2).`},
        { players: 3, weapons: 0, deaths: [1, 2], text: `(Jogador1) entrou em batalha com o (Jogador2), porém o (Jogador3) aparece do nada e mata os dois sorrateiramente.`},
        { players: 3, weapons: 1, deaths: [3], text: `(Jogador1) se depara com (Jogador2) e (Jogador3) e acaba se envolvendo em uma enrascada. (Jogador1) usa um Fortátil, e em quanto isso (Jogador2) elimina (Jogador3) com (Arma1).`},
        { players: 4, weapons: 1, deaths: [2, 3], text: `(Jogador1) avista (Jogador2), (Jogador3) e (Jogador4). (Jogador1) joga uma granada que elimina (Jogador2) e (Jogador3). (Jogador4) acaba ficando com 20 de vida e foge com uma fenda portátil.`},
        { players: 2, weapons: 1, deaths: [2], text: `(Jogador1) consegue eliminar (Jogador2) com (Arma1) sem mirar.`},
        { players: 1, weapons: 0, deaths: [1], text: `(Jogador1) construiu uma rampa para usar o jump e errou o pulo, se eliminando por queda.`},
        { players: 2, weapons: 1, deaths: [2], text: `(Jogador1) que estava escondido numa moita, conseque eliminar (Jogador2) com (Arma1).`},

        { players: 2, weapons: 0, deaths: [1], text: `(Jogador1) e (Jogador2) estão batalhando. O material de (Jogador1) acaba e, sem conseguir construir um chão, (Jogador1) acaba se eliminando por queda.`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) e (Jogador2) estão batalhando. O material de (Jogador2) acaba e, sem conseguir construir um chão, (Jogador2) acaba se eliminando por queda.`},

        { players: 2, weapons: 1, deaths: [1], text: `(Jogador1) estava abrindo um drop quando (Jogador2) chegou e eliminou (Jogador1) com (Arma1).`},

        { players: 2, weapons: 0, deaths: [1], text: `(Jogador1) e (Jogador2) estão batalhando. (Jogador2) joga uma Granada Boogie-Woogie que faz (Jogador1) dançar, e com isso consegue eliminar (Jogador1) bem tranquilamente.`},
        { players: 2, weapons: 0, deaths: [2], text: `(Jogador1) e (Jogador2) estão batalhando. (Jogador1) joga uma Granada Boogie-Woogie que faz (Jogador2) dançar, e com isso consegue eliminar (Jogador2) bem tranquilamente.`},
    ];
}

export default (new FortniteEvents());