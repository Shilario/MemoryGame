/*
 * Create a list that holds all of your cards
 */
let cardClasses = ['fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle'];
let listOfCardClassses = cardClasses.concat(cardClasses);
let moveCount = document.getElementsByClassName('moves');
let ratingStars = document.getElementsByClassName('fa-star');
let moves = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createCards() {
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        let newIcon = document.createElement('i');
        let cardsShuffled = shuffle(listOfCardClassses);

        newIcon.className = cardsShuffled.pop();
        cards.item(i).appendChild(newIcon);

        cards.item(i).addEventListener('click', function (e) {
            toggleOpenCard(e.target);
        });
    }
}

function toggleOpenCard(e) {
    let startTime = performance.now();
    let endTime, totalTimeInGame;
    e.className = 'card open show';
    let cards = document.getElementsByClassName('show');
    let cardsMatch = document.getElementsByClassName('match');

    if (cardsMatch.length === 16) {
        createModal();
        endTime = performance.now;
        totalTimeInGame = endTime - startTime;
    };

    let firstCardChosen = cards.item(0).getElementsByClassName('fa').item(0);
    let secondCardChosen;

    if (cards.length != 1) {
        secondCardChosen = cards.item(1).getElementsByClassName('fa').item(0);
    }
    setTimeout(() =>{
        if (cards.length === 1) {
            moves++;
            e.className ='card open show';
            moveCount.item(0).innerHTML = moves;
        } else if (firstCardChosen.classList.value === secondCardChosen.classList.value) {
            cards.item(1).className = 'card match';
            cards.item(0).className = 'card match';
            moves++;
            moveCount.item(0).innerHTML = moves;
        } else {
            cards.item(1).className = 'card';
            cards.item(0).className = 'card';
            moves++;
            moveCount.item(0).innerHTML = moves;
        }
    },250);
    playerRating(moves);
}

function createModal() {
    let newModal = document.createElement('div');
    let newModalContent = document.createElement('div');
    newModal.className = 'modal';
    newModalContent.className = 'modal-content';

    let modal = document.body.appendChild(newModal);
    modal.appendChild(newModalContent);
}

function playerRating(moves) {

    if (moves === 17 && ratingStars.length ===
        3) {
        ratingStars.item(0).remove();
    } else if (moves === 25 && ratingStars.length === 2) {
        ratingStars.item(0).remove();
    } else {
        return;
    }
}

function resetGame() {
    createCards();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

createCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
