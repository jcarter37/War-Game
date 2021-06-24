/*----- constants -----*/

const suits = ["h", "d", "c", "s"]
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const faceValues = {J: 11, Q: 12, K: 13, A: 14};
const masterDeck = createDeck()



/*----- app's state (variables) -----*/
let deck, playerDeck, computerDeck, playerCard, computerCard, pDeckCount, cDeckCount, playerWarCards, computerWarCards, winner



/*----- cached element references -----*/
const pDeckEl = document.querySelector('#player-stack');
const cDeckEl = document.querySelector('#comp-stack');

const pScoreEl = document.querySelector('#player-score');
const cScoreEl = document.querySelector('#comp-score');



/*----- event listeners -----*/
document.querySelector('#play').addEventListener('click', drawCard);



/*----- functions -----*/
function initialize() {
    deck = shuffleDeck(masterDeck);
    playerDeck = deck.splice(0, 26);
    computerDeck = deck
    playerWarCards = [];
    computerWarCards = [];
    playerCard = {};
    computerCard = {};
    winner = null;
    render()
}



function createDeck() {
	let deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            let card = {
                Rank: Number(rank) || faceValues[rank],
                Suit: `${suit}${rank}`
            };
			deck.push(card);
        })
    })
    console.log(deck);
    return deck

} 


function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let newIdx = Math.floor(Math.random() * (i + 1));
        let oldValue = deck[newIdx];
        deck[newIdx] = deck[i];
        deck[i] = oldValue;
    }
    return deck;
}

function drawCard(){
    playerCard = playerDeck.shift();
    computerCard = computerDeck.shift(); 
    console.log(playerCard)
    console.log(computerCard)
    compareCards();
}



function compareCards(){
    if(playerCard.Rank > computerCard.Rank) {
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
        console.log(`Player wins with ${playerCard.Rank} of ${playerCard.Suit}`)
    }else if(playerCard.Rank < computerCard.Rank) {
        computerDeck.push(computerCard);
        computerDeck.push(playerCard);
        console.log(`Computer wins with ${computerCard.Rank} of ${computerCard.Suit}`)
    } else {
        handleWar();
    }
    render();
}

function render() {
    pScoreEl.textContent = `Player Deck Count: ${playerDeck.length}`;
	cScoreEl.textContent = `Computer Deck Count: ${computerDeck.length}`;
    if ("Suit" in playerCard && "Suit" in computerCard) {
        pDeckEl.innerHTML = `<div class="card ${playerCard.Suit}"></div>`
	    cDeckEl.innerHTML = `<div class="card ${computerCard.Suit}"></div>`
    }   
}


function handleWar(i=0) {
    console.log("war happened!!!!")
    // grab 4 cards from each deck & keep any old cards   ... spread operator
    playerWarCards = [...playerWarCards, ...playerDeck.splice(0, 4)];
    computerWarCards = [...computerWarCards, ...computerDeck.splice(0, 4)];
    // compare the first card in each to see who wins
    if (playerWarCards[i].Rank > computerWarCards[i].Rank) {
        playerDeck.push(...playerWarCards);
        playerDeck.push(...computerWarCards);
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
        playerWarCards = [];
        computerWarCards = [];
    } else if (playerWarCards[i].Rank < computerWarCards[i].Rank) {
        computerDeck.push(...playerWarCards);
        computerDeck.push(...computerWarCards);
        computerDeck.push(computerCard);
        computerDeck.push(playerCard);
        playerWarCards = [];
        computerWarCards = [];
    } else {
        handleWar(i + 4);
    }
} 

// if playerdeck 0 || computer  deck 0 
// call check winner at beginning of handle war

initialize();