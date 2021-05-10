const cards = document.querySelectorAll('.card');
const image = document.querySelectorAll('.image');

const comparison = {
    currentCard: null,
    previousCard: null
};

function resetComparison() {
    comparison.currentCard = null;
    comparison.previousCard = null;
}

function shuffleCards() {
    cards.forEach( e => e.style.background = 'linear-gradient(120deg, #b25b36, #984d2e)' );
    image.forEach( e => e.style.background = "url('img/card-back.png') no-repeat center / cover #E0A234" );
    image.forEach( e => e.style.border = '0' );

    let deck = document.getElementById('deck');
    let allCards = deck.children.length;

    for (allCards; allCards >= 0; allCards--) {
        deck.appendChild(deck.children[Math.random() * allCards | 0]);
    }

    if (comparison.currentCard !== null) {
        resetComparison();
        console.log(comparison);
    }

    let match = document.querySelectorAll('.match');
    match.forEach( e => e.style.pointerEvents = null );
    match.forEach( e => e.classList.remove('match') );
}

shuffleCards();

cards.forEach( e => e.addEventListener('click', e => {
    let charachterCard = e.target.id;

    e.target.classList.add('selected-card');
    e.target.parentElement.style.background = null;
    e.target.style.background = null;
    e.target.style.border = null;

    let flipSound = document.getElementById('flip-sound');
    flipSound.play();

    if (comparison.currentCard === null && comparison.previousCard === null) {
        comparison.currentCard = charachterCard;
        console.log(comparison);
        return;
    }

    if (comparison.currentCard !== null && comparison.previousCard === null) {
        comparison.previousCard = comparison.currentCard;
        comparison.currentCard = charachterCard;
        compareCards();
        return;
    }
}));

function compareCards() {
    let selectedCards = document.querySelectorAll('.selected-card');

    if (comparison.currentCard === comparison.previousCard) {
        selectedCards.forEach( e => e.classList.add('match') );
        selectedCards.forEach( e => e.classList.remove('selected-card') );

        let match = document.querySelectorAll('.match');

        match.forEach( e => e.style.pointerEvents = 'none' );

        let matchSound = document.getElementById('match-sound');
        matchSound.play();

        if (match.length === 12) {
            let winSound = document.getElementById('win-sound');

            function winSoundDelay() {
                winSound.play();
            }

            setTimeout(winSoundDelay, 300);

            let winModal = document.querySelector('.win-modal');
            winModal.classList.add('show-modal');

            let playButton = document.getElementById('play-again');

            function playAgain() {
                winModal.classList.remove('show-modal');

                let shuffleSound = document.getElementById('shuffle-sound');
                shuffleSound.play();

                shuffleCards();
            }

            playButton.addEventListener('click', playAgain);

            console.log('Gratz, You win!');
            return;
        }

        console.log(comparison, match.length);

        resetComparison();
        return;
    }

    if (comparison.currentCard !== comparison.previousCard) {
        selectedCards.forEach( e => e.classList.add('no-match') );
        selectedCards.forEach( e => e.classList.remove('selected-card') );

        let noMatch = document.querySelectorAll('.no-match');

        function hideDelay() {
            noMatch.forEach( e => e.parentElement.style.background = 'linear-gradient(120deg, #b25b36, #984d2e)' );
            noMatch.forEach( e => e.style.background = "url('img/card-back.png') no-repeat center / cover #E0A234" );
            noMatch.forEach( e => e.style.border = '0' );
            noMatch.forEach( e => e.classList.remove('no-match') );
        }

        setTimeout(hideDelay, 500);

        resetComparison();
        console.log(comparison);
        return;
    }
}