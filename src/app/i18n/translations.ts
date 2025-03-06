interface Card {
  id: number;
  name: string;
  letter: string;
  emoji: string;
  description: string[];
  detailed_description: string[];
}

export interface Translations {
  [key: string]: {
    title: string;
    description: string;
    cards: Card[];
    general: {
      title: string;
      description: string[];
    };
  };
}

const translations: Translations = {
  de: {
    title: "DOG Regeln",
    description: "Generiert durch create next app",
    cards: [
      { id: 1, name: 'Joker', letter: 'J', emoji: '🃏', description: ['Kann nur als Joker verwendet werden.', 'Es ist nicht erlaubt, das Spiel mit einem Joker zu beenden.'], detailed_description: [] },
      { id: 2, name: 'Ass', letter: 'A', emoji: '♠', description: ['Murmel vom Zwinger zum Start', '1 vorwärts fahren', '11 vorwärts fahren'], detailed_description: [] },
      { id: 3, name: 'König', letter: 'K', emoji: '♠', description: ['Murmel vom Zwinger zum Start', '13 vorwärts fahren'], detailed_description: [] },
      { id: 4, name: 'Dame', letter: 'Q', emoji: '♠', description: ['12 vorwärts fahren', 'die oberste Karte auf dem Stapel kopieren. Dies kopiert nur die Karte, nicht die Aktion'], detailed_description: ['Wenn zum Beispiel der vorherige Spieler einen Joker gespielt und 6 vorwärts bewegt hat, kann der kopierte Joker auch für etwas anderes verwendet werden'] },
      { id: 5, name: 'Bube', letter: 'J', emoji: '♠', description: ['Zwei Murmeln austauschen, keine davon muss deine eigene sein'], detailed_description: ['frisch auf den Start gesetzte Murmeln dürfen nicht ausgetauscht werden'] },
      { id: 6, name: '10', letter: '10', emoji: '♠', description: ['10 vorwärts fahren'], detailed_description: [] },
      { id: 7, name: '9', letter: '9', emoji: '♠', description: ['9 vorwärts fahren'], detailed_description: [] },
      { id: 8, name: '8', letter: '8', emoji: '♠', description: ['8 vorwärts fahren', 'alle Handkarten mit jemand anderem tauschen'], detailed_description: ['kann abgewehrt werden, wenn die andere Person eine <b>8</b>, <b>Q</b> oder einen <b>J</b> spielt', 'abwehren zählt nicht als Zug'] },
      { id: 9, name: '7', letter: '7', emoji: '♠', description: ['7 vorwärts fahren', 'kann auf alle Murmeln auf dem Brett verteilt werden'], detailed_description: ['frisch auf den Startpunkt gesetzte Murmeln dürfen nicht bewegt werden', 'muss ausgefahren werden'] },
      { id: 10, name: '6', letter: '6', emoji: '♠', description: ['6 vorwärts fahren', 'Richtung des Spiels ändern (↪️/↩️)'], detailed_description: ['dabei wird sowohl die Fahrtrichtung, als auch die Legerichtung gedreht'] },
      { id: 11, name: '5', letter: '5', emoji: '♠', description: ['5 vorwärts fahren'], detailed_description: [] },
      { id: 12, name: '4', letter: '4', emoji: '♠', description: ['4 vorwärts oder rückwärts fahren'], detailed_description: ['es ist erlaubt, das Ziel rückwärts über den Start zu erreichen'] },
      { id: 13, name: '3', letter: '3', emoji: '♠', description: ['3 vorwärts fahren'], detailed_description: [] },
      { id: 14, name: '2', letter: '2', emoji: '♠', description: ['2 vorwärts fahren', 'eine einzelne Karte von jemand anderem stehlen'], detailed_description: ['kann abgewehrt werden, wenn die andere Person eine <b>2</b>, <b>Q</b> oder einen <b>J</b> spielt', 'abwehren zählt nicht als Zug'] },
    ],
    general: {
      title: "Allgemeine Regeln",
      description: [
        'Jede Runde wird mit 6 Karten pro Person gespielt',
        'Gleit isch gleit',
        'Berührt ist geführt',
        'Offizielle Regeln findest du unter: <a href="https://www.braendi-dog.de/en/braendi-dog-spielregeln-anleitungen.html" target="_blank" rel="noopener noreferrer">www.braendi-dog.de</a>'
      ],
    },
  },
  en: {
    title: "DOG Rules",
    description: "",
    cards: [
      { id: 1, name: 'Joker', letter: 'J', emoji: '🃏', description: ['Can only be used as a Joker.', 'It is not allowed to end the game with a Joker.'], detailed_description: [] },
      { id: 2, name: 'Ace', letter: 'A', emoji: '♠', description: ['Move a marble from the kennel to the start', 'Move 1 forward', 'Move 11 forward'], detailed_description: [] },
      { id: 3, name: 'King', letter: 'K', emoji: '♠', description: ['Move a marble from the kennel to the start', 'Move 13 forward'], detailed_description: [] },
      { id: 4, name: 'Queen', letter: 'Q', emoji: '♠', description: ['Move 12 forward', 'Copy the top card from the stack. This only copies the card, not the action'], detailed_description: ['For example, if the previous player played a Joker and moved 6 forward, the copied Joker can also be used for something else'] },
      { id: 5, name: 'Jack', letter: 'J', emoji: '♠', description: ['Swap two marbles, none of them have to be your own'], detailed_description: ['Marbles freshly placed on the start cannot be swapped'] },
      { id: 6, name: '10', letter: '10', emoji: '♠', description: ['Move 10 forward'], detailed_description: [] },
      { id: 7, name: '9', letter: '9', emoji: '♠', description: ['Move 9 forward'], detailed_description: [] },
      { id: 8, name: '8', letter: '8', emoji: '♠', description: ['Move 8 forward', 'Swap all hand cards with someone else'], detailed_description: ['Can be blocked if the other person plays an <b>8</b>, <b>Q</b>, or a <b>J</b>', 'Blocking does not count as a move'] },
      { id: 9, name: '7', letter: '7', emoji: '♠', description: ['Move 7 forward', 'Can be distributed to any marbles on the board'], detailed_description: ['Marbles freshly placed on the start cannot be moved', 'Must be used up'] },
      { id: 10, name: '6', letter: '6', emoji: '♠', description: ['Move 6 forward', 'Change the direction of the game (↪️/↩️)'], detailed_description: ['This will change both the direction of movement and placement'] },
      { id: 11, name: '5', letter: '5', emoji: '♠', description: ['Move 5 forward'], detailed_description: [] },
      { id: 12, name: '4', letter: '4', emoji: '♠', description: ['Move 4 forward or backward'], detailed_description: ['It is allowed to reach the goal backward via the start'] },
      { id: 13, name: '3', letter: '3', emoji: '♠', description: ['Move 3 forward'], detailed_description: [] },
      { id: 14, name: '2', letter: '2', emoji: '♠', description: ['Move 2 forward', 'Steal a single card from someone else'], detailed_description: ['Can be blocked if the other person plays a <b>2</b>, <b>Q</b>, or a <b>J</b>', 'Blocking does not count as a move'] },
    ],
    general: {
      title: "General rules",
      description: [
        'Each round is played with 6 cards per person',
        'A move is a move',
        'Touched is played',
        'Find more rules at: <a href="https://www.braendi-dog.de/en/braendi-dog-spielregeln-anleitungen.html" target="_blank" rel="noopener noreferrer">https://www.braendi-dog.de</a>'
      ],
    },
  },
  es: {
    title: "Reglas de DOG",
    description: "",
    cards: [
      { id: 1, name: 'Joker', letter: 'J', emoji: '🃏', description: ['Solo puede usarse como un Joker.', 'No se permite terminar el juego con un Joker.'], detailed_description: [] },
      { id: 2, name: 'As', letter: 'A', emoji: '♠', description: ['Mover una canica desde el corral al inicio', 'Mover 1 hacia adelante', 'Mover 11 hacia adelante'], detailed_description: [] },
      { id: 3, name: 'Rey', letter: 'K', emoji: '♠', description: ['Mover una canica desde el corral al inicio', 'Mover 13 hacia adelante'], detailed_description: [] },
      { id: 4, name: 'Reina', letter: 'Q', emoji: '♠', description: ['Mover 12 hacia adelante', 'Copiar la carta superior del mazo. Esto solo copia la carta, no la acción'], detailed_description: ['Por ejemplo, si el jugador anterior jugó un Joker y avanzó 6, el Joker copiado también puede usarse para otra cosa'] },
      { id: 5, name: 'Sota', letter: 'J', emoji: '♠', description: ['Intercambiar dos canicas, ninguna de ellas tiene que ser tuya'], detailed_description: ['Las canicas recién colocadas en el inicio no se pueden intercambiar'] },
      { id: 6, name: '10', letter: '10', emoji: '♠', description: ['Mover 10 hacia adelante'], detailed_description: [] },
      { id: 7, name: '9', letter: '9', emoji: '♠', description: ['Mover 9 hacia adelante'], detailed_description: [] },
      { id: 8, name: '8', letter: '8', emoji: '♠', description: ['Mover 8 hacia adelante', 'Intercambiar todas las cartas en mano con otra persona'], detailed_description: ['Puede bloquearse si la otra persona juega un <b>8</b>, <b>Q</b> o un <b>J</b>', 'El bloqueo no cuenta como movimiento'] },
      { id: 9, name: '7', letter: '7', emoji: '♠', description: ['Mover 7 hacia adelante', 'Puede distribuirse a cualquier canica en el tablero'], detailed_description: ['Las canicas recién colocadas en el inicio no pueden moverse', 'Debe usarse'] },
      { id: 10, name: '6', letter: '6', emoji: '♠', description: ['Mover 6 hacia adelante', 'Cambiar la dirección del juego (↪️/↩️)'], detailed_description: ['Esto cambiará tanto la dirección de movimiento como la de colocación'] },
      { id: 11, name: '5', letter: '5', emoji: '♠', description: ['Mover 5 hacia adelante'], detailed_description: [] },
      { id: 12, name: '4', letter: '4', emoji: '♠', description: ['Mover 4 hacia adelante o hacia atrás'], detailed_description: ['Está permitido llegar al objetivo retrocediendo por el inicio'] },
      { id: 13, name: '3', letter: '3', emoji: '♠', description: ['Mover 3 hacia adelante'], detailed_description: [] },
      { id: 14, name: '2', letter: '2', emoji: '♠', description: ['Mover 2 hacia adelante', 'Robar una carta de otra persona'], detailed_description: ['Puede bloquearse si la otra persona juega un <b>2</b>, <b>Q</b> o un <b>J</b>', 'El bloqueo no cuenta como movimiento'] },
    ],
    general: {
      title: "Reglas generales",
      description: [
        'Cada ronda se juega con 6 cartas por persona',
        'Carta jugada, carta queda',
        'Pieza tocada, pieza movida',
        'Las reglas oficiales se encuentran en: <a href="https://www.braendi-dog.de/en/braendi-dog-spielregeln-anleitungen.html" target="_blank" rel="noopener noreferrer">https://www.braendi-dog.de</a>'
      ],
    },
  },
  it: {
    title: "Regole DOG",
    description: "",
    cards: [
      { id: 1, name: 'Joker', letter: 'J', emoji: '🃏', description: ['Può essere usato solo come Joker.', 'Non è consentito terminare il gioco con un Joker.'], detailed_description: [] },
      { id: 2, name: 'Asso', letter: 'A', emoji: '♠', description: ['Muovere una biglia dal recinto all’inizio', 'Muovere 1 in avanti', 'Muovere 11 in avanti'], detailed_description: [] },
      { id: 3, name: 'Re', letter: 'K', emoji: '♠', description: ['Muovere una biglia dal recinto all’inizio', 'Muovere 13 in avanti'], detailed_description: [] },
      { id: 4, name: 'Regina', letter: 'Q', emoji: '♠', description: ['Muovere 12 in avanti', 'Copiare la carta in cima al mazzo. Questo copia solo la carta, non l’azione'], detailed_description: ['Ad esempio, se il giocatore precedente ha giocato un Joker e ha avanzato di 6, il Joker copiato può anche essere utilizzato per altro'] },
      { id: 5, name: 'Fante', letter: 'J', emoji: '♠', description: ['Scambiare due biglie, nessuna delle quali deve essere la tua'], detailed_description: ['Le biglie appena piazzate all’inizio non possono essere scambiate'] },
      { id: 6, name: '10', letter: '10', emoji: '♠', description: ['Muovere 10 in avanti'], detailed_description: [] },
      { id: 7, name: '9', letter: '9', emoji: '♠', description: ['Muovere 9 in avanti'], detailed_description: [] },
      { id: 8, name: '8', letter: '8', emoji: '♠', description: ['Muovere 8 in avanti', 'Scambiare tutte le carte in mano con qualcun altro'], detailed_description: ['Può essere bloccato se l’altra persona gioca un <b>8</b>, <b>Q</b> o un <b>J</b>', 'Il blocco non conta come mossa'] },
      { id: 9, name: '7', letter: '7', emoji: '♠', description: ['Muovere 7 in avanti', 'Può essere distribuito a tutte le biglie sul tabellone'], detailed_description: ['Le biglie appena piazzate all’inizio non possono essere mosse', 'Deve essere utilizzato'] },
      { id: 10, name: '6', letter: '6', emoji: '♠', description: ['Muovere 6 in avanti', 'Cambiare direzione del gioco (↪️/↩️)'], detailed_description: ['Questo cambierà sia la direzione del movimento che della disposizione'] },
      { id: 11, name: '5', letter: '5', emoji: '♠', description: ['Muovere 5 in avanti'], detailed_description: [] },
      { id: 12, name: '4', letter: '4', emoji: '♠', description: ['Muovere 4 in avanti o indietro'], detailed_description: ['È consentito raggiungere l’obiettivo indietro passando per l’inizio'] },
      { id: 13, name: '3', letter: '3', emoji: '♠', description: ['Muovere 3 in avanti'], detailed_description: [] },
      { id: 14, name: '2', letter: '2', emoji: '♠', description: ['Muovere 2 in avanti', 'Rubare una carta da qualcun altro'], detailed_description: ['Può essere bloccato se l’altra persona gioca un <b>2</b>, <b>Q</b> o un <b>J</b>', 'Il blocco non conta come mossa'] },
    ],
    general: {
      title: "Regole generali",
      description: [
        'Ogni turno si gioca con 6 carte per persona',
        'Carta giocata, carta posata',
        'Pezzo toccato, pezzo mosso',
        'Trova altre regole su: <a href="https://www.braendi-dog.de/en/braendi-dog-spielregeln-anleitungen.html" target="_blank" rel="noopener noreferrer">https://www.braendi-dog.de/</a>'
      ],
    },
  },
  fr: {
    title: "Règles du DOG",
    description: "",
    cards: [
      { id: 1, name: 'Joker', letter: 'J', emoji: '🃏', description: ['Ne peut être utilisé que comme Joker.', 'Il est interdit de terminer la partie avec un Joker.'], detailed_description: [] },
      { id: 2, name: 'As', letter: 'A', emoji: '♠', description: ['Déplacer une bille du chenil au départ', 'Avancer de 1', 'Avancer de 11'], detailed_description: [] },
      { id: 3, name: 'Roi', letter: 'K', emoji: '♠', description: ['Déplacer une bille du chenil au départ', 'Avancer de 13'], detailed_description: [] },
      { id: 4, name: 'Dame', letter: 'Q', emoji: '♠', description: ['Avancer de 12', 'Copier la carte du dessus de la pile. Cela ne copie que la carte, pas l’action'], detailed_description: ['Par exemple, si le joueur précédent a joué un Joker et a avancé de 6, le Joker copié peut également être utilisé pour autre chose'] },
      { id: 5, name: 'Valet', letter: 'J', emoji: '♠', description: ['Échanger deux billes, aucune d’entre elles n’a besoin d’être la vôtre'], detailed_description: ['Les billes placées récemment sur le départ ne peuvent pas être échangées'] },
      { id: 6, name: '10', letter: '10', emoji: '♠', description: ['Avancer de 10'], detailed_description: [] },
      { id: 7, name: '9', letter: '9', emoji: '♠', description: ['Avancer de 9'], detailed_description: [] },
      { id: 8, name: '8', letter: '8', emoji: '♠', description: ['Avancer de 8', 'Échanger toutes les cartes en main avec quelqu’un d’autre'], detailed_description: ['Peut être bloqué si l’autre joueur joue un <b>8</b>, <b>Q</b> ou un <b>J</b>', 'Le blocage ne compte pas comme un mouvement'] },
      { id: 9, name: '7', letter: '7', emoji: '♠', description: ['Avancer de 7', 'Peut être distribué à toutes les billes sur le plateau'], detailed_description: ['Les billes placées récemment sur le départ ne peuvent pas être déplacées', 'Doit être utilisé'] },
      { id: 10, name: '6', letter: '6', emoji: '♠', description: ['Avancer de 6', 'Changer la direction du jeu (↪️/↩️)'], detailed_description: ['Cela changera à la fois la direction de déplacement et la direction de placement'] },
      { id: 11, name: '5', letter: '5', emoji: '♠', description: ['Avancer de 5'], detailed_description: [] },
      { id: 12, name: '4', letter: '4', emoji: '♠', description: ['Avancer de 4 ou reculer'], detailed_description: ['Il est permis d’atteindre l’objectif en reculant via le départ'] },
      { id: 13, name: '3', letter: '3', emoji: '♠', description: ['Avancer de 3'], detailed_description: [] },
      { id: 14, name: '2', letter: '2', emoji: '♠', description: ['Avancer de 2', 'Voler une carte à quelqu’un d’autre'], detailed_description: ['Peut être bloqué si l’autre joueur joue un <b>2</b>, <b>Q</b> ou un <b>J</b>', 'Le blocage ne compte pas comme un mouvement'] },
    ],
    general: {
      title: "Règles générales",
      description: [
        'Chaque tour se joue avec 6 cartes par personne',
        'Carte posée, carte jouée',
        'pièce touchée, pièce jouée',
        'Trouvez plus de règles sur: <a href="https://www.braendi-dog.de/en/braendi-dog-spielregeln-anleitungen.html" target="_blank" rel="noopener noreferrer">https://www.braendi-dog.de</a>'
      ],
    },
  },
};

export default translations;
