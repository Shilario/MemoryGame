/*
 * Create a list that holds all of your cards
 */
let cardClasses = ['fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle'];
let startTime = 0;
let moveCount = document.getElementsByClassName('moves');
let ratingStars = document.getElementsByClassName('list-star');
let moves = 0;

/**
 * Creates the board game, add classes to the list items
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * @param listOfCardClassses
 */
function createCards(listOfCardClasses) {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        let newIcon = document.createElement('i');

        let cardsShuffled = shuffle(listOfCardClasses);
        newIcon.className = cardsShuffled.pop();

        cards.item(i).appendChild(newIcon);

        cards.item(i).addEventListener('click', toggleOpenCard)
        // cards.item(i).addEventListener('click', function (e) {
        //     toggleOpenCard(e.target);
        // });
    }

}

/**
 * Toggles the classes whe cards are click
 * @param e
 */
let toggleOpenCard = function (e) {
    let element = e.target;
    if (startTime === 0){
        $("#timer").timer({seconds:0});
    }

    element.className = 'card open show';
    let cards = document.getElementsByClassName('show');
    let cardsMatch = document.getElementsByClassName('match');

    if (cardsMatch.length === 14 && cards.length === 2) {
        let totalTimeInGame = $("#timer").data('seconds');
        $("#timer").timer('remove');
        createModal(totalTimeInGame, ratingStars);
    };

    let firstCardChosen = cards.item(0).getElementsByClassName('fa').item(0);
    let secondCardChosen;

    if (cards.length != 1) {
        secondCardChosen = cards.item(1).getElementsByClassName('fa').item(0);
    }

    setTimeout(() =>{
        if (cards.length === 1) {
            moves++;
            element.className ='card open show';
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

/**
 * Creates modal to be shown when the players wins
 * @param playedTime
 * @param stars
 */
function createModal(playedTime, stars) {
    let newModal = document.createElement('div');
    let newModalContent = document.createElement('div');
    let contentHeader = document.createElement('h1');
    let headerText = document.createTextNode('Congratulations, You Win!!!');

    let divStars = document.createElement('div');
    let starsHeader = document.createElement('h1');
    let starsHeaderContent = document.createTextNode('Star Rating:');
    let timePlayed = document.createElement('div');
    timePlayed.innerText = playedTime;

    let divTimePlayed = document.createElement('div');
    let timePlayedHeader = document.createElement('h1');
    let timePlayedHeaderContent = document.createTextNode('Time Played:');

    let resetBtnDiv = document.createElement('div');
    let resetBtn = document.createElement('button');
    resetBtn.innerHTML = 'Reset Game';

    contentHeader.appendChild(headerText);
    starsHeader.appendChild(starsHeaderContent);
    timePlayedHeader.appendChild(timePlayedHeaderContent);

    newModal.className = 'modal';
    newModalContent.className = 'modal-content';
    divStars.className = 'start-rating';
    divTimePlayed.className = 'time-played';
    resetBtn.className = 'reset-btn';

    divStars.appendChild(starsHeader);
    divTimePlayed.appendChild(timePlayedHeader);
    addStarsRating(stars.length, divStars);
    divTimePlayed.appendChild(timePlayed);
    resetBtnDiv.appendChild(resetBtn);


    newModalContent.appendChild(contentHeader);
    newModalContent.appendChild(divStars);
    newModalContent.appendChild(divTimePlayed);
    newModalContent.appendChild(resetBtnDiv);

    let modal = document.body.appendChild(newModal);
    modal.appendChild(newModalContent);

    // Button tha restart the game after winning
    resetBtn.addEventListener('click', function () {
        restartGame();
        let modal = document.getElementsByClassName('modal');
        modal.item(0).remove();
    });
}

/**
 * Calculate the stars rating according to the amount of moves a playes has played.
 * @param moves
 */
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

/**
 * Append the stars the user gain in the game after playing(modal)
 * @param stars
 * @param starsRatingContainer
 */
function addStarsRating(stars, starsRatingContainer) {
    let starsContainer = document.createElement('div');
    let starsList = document.createElement('ul');

    starsContainer.appendChild(starsList);

    for(let i=0; i < stars; i++) {
        let starsElements = document.createElement('li');
        starsElements.className = 'fa fa-star';
        starsContainer.appendChild(starsElements);
    }

    starsRatingContainer.appendChild(starsContainer);
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

/**
 * Reset game board. Remove children of the card's htmlCollection
 */
function clearBoard() {
    let cards = document.getElementsByClassName('card');

    for(let i = cards.length -1; i >= 0; i--) {
        while(cards.item(i).firstChild) {
            cards.item(i).className = 'card';
            cards.item(i).removeEventListener('click', toggleOpenCard)
            cards.item(i).removeChild(cards.item(i).firstChild);
        }
    }
}

/**
 * Restart Game logic
 */
function restartGame() {
    let classesForCards = cardClasses.concat(cardClasses);
    startTime = 0;
    moves = 0;
    moveCount.item(0).innerHTML = moves;
    let starsContainer = document.getElementsByClassName('stars');
    let missingStars = 3 - ratingStars.length;

    for (let i=0; i < missingStars; i++) {
        let ratingContainerList = document.createElement('li');
        ratingContainerList.className = 'list-star';
        let starsElements = document.createElement('i');
        starsElements.className = 'fa fa-star';

        ratingContainerList.appendChild(starsElements);
        starsContainer.item(0).appendChild(ratingContainerList);
    }

    clearBoard();
    createCards(classesForCards);
    $("#timer").timer('remove');
}

$(document).ready(function () {
    // Create initial board
    let listOfCardClasses = cardClasses.concat(cardClasses);
    createCards(listOfCardClasses);

    //resets gaming board
    let resetGameBtn = document.getElementsByClassName('fa fa-repeat');
    resetGameBtn.item(0).addEventListener('click', function () {
        restartGame();
    });
});
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
