const suits = ['h', 'd', 'c', 's']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const faceValues = {J: 11, Q: 12, K: 13, A: 14};
const masterDeck = createDeck()



let deck, playerDeck, computerDeck, playerCard, computerCard, pDeckCount, cDeckCount, playerWarCards, computerWarCards, winner




const pDeckEl = document.querySelector('#player-card');
const cDeckEl = document.querySelector('#comp-card');
const pStackEl = document.querySelector('#player-stack');
const cStackEl = document.querySelector('#comp-stack');
const pWarEl = document.querySelector('#player-war');
const cWarEl = document.querySelector('#comp-war');
const pScoreEl = document.querySelector('#player-score');
const cScoreEl = document.querySelector('#comp-score');
const pWinEl = document.querySelector('#p-win');
const cWinEl = document.querySelector('#c-win');


document.querySelector('#play').addEventListener('click', drawCard);
document.querySelector('#reset').addEventListener('click', initialize);



function initialize() {
    deck = shuffleDeck([...masterDeck]);
    playerDeck = deck.splice(0, 26);
    computerDeck = deck
    playerWarCards = [];
    computerWarCards = [];
    playerCard = {};
    computerCard = {};
    winner = null;
    render()
    renderWarCards();
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
    });
    return deck;
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
    compareCards();
}


function compareCards(){
    pWarEl.innerHTML = '';
    cWarEl.innerHTML = '';
    checkWinner();
    if(playerCard.Rank > computerCard.Rank) {
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
    } else if(playerCard.Rank < computerCard.Rank) {
        computerDeck.push(computerCard);
        computerDeck.push(playerCard);
    } else{
        handleWar();
    }
    render();
}

function render() {
    if (playerDeck.length > 0) {
        pStackEl.innerHTML = `<div class="card back"></div>`;
    } else {
        pStackEl.innerHTML = '';
    } 
    if (computerDeck.length > 0) {
        cStackEl.innerHTML = `<div class="card back"></div>`;
    } else {
        cStackEl.innerHTML = '';
    } 
    if (playerDeck.length === 0){
        cWinEl.innerHTML = 'Computer Wins!'
    } else {
        cWinEl.innerHTML = '';
    } 
    if (computerDeck.length === 0) {
        pWinEl.innerHTML = 'Player Wins!'
    } else {
        pWinEl.innerHTML = '';
    }

    pScoreEl.textContent = `Player Deck Count: ${playerDeck.length}`;
    cScoreEl.textContent = `Computer Deck Count: ${computerDeck.length}`;
    pDeckEl.innerHTML = `<div class='card ${playerCard && playerCard.Suit}'></div>`;
	cDeckEl.innerHTML = `<div class='card ${computerCard && computerCard.Suit}'></div>`;
    }

    
function renderWarCards() {
    let pTemplate = '';
    playerWarCards.forEach(function(card, idx) {
        pTemplate += `<div class='card ${card.Suit} ${idx === 0 ? 'shadow': ''}'></div>`
    })
    pWarEl.innerHTML = pTemplate;
    let cTemplate = '';
    computerWarCards.forEach(function (card, idx) {
      cTemplate += `<div class='card ${card.Suit} ${idx === 0 ? 'shadow': ''}'></div>`;
    });
    cWarEl.innerHTML = cTemplate;
}



function handleWar() {
    checkWinner();
    playerWarCards = [...playerDeck.splice(0, 4), ...playerWarCards];
    computerWarCards = [...computerDeck.splice(0, 4), ...computerWarCards];
    renderWarCards();
    if (playerWarCards[0].Rank > computerWarCards[0].Rank) {
        playerDeck.push(...playerWarCards);
        playerDeck.push(...computerWarCards);
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
        playerWarCards = [];
        computerWarCards = [];
    } else if (playerWarCards[0].Rank < computerWarCards[0].Rank) {
        computerDeck.push(...playerWarCards);
        computerDeck.push(...computerWarCards);
        computerDeck.push(computerCard);
        computerDeck.push(playerCard);
        playerWarCards = [];
        computerWarCards = [];
    } else {
        handleWar();
    }
}


function checkWinner() {
    if (playerDeck.length === 0){
        winner = true;
    }else if (computerDeck.length === 0) {
        winner = true;
    } 
}

initialize();