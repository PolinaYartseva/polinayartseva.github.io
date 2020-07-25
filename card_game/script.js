

let difficulty = document.getElementById('levels');

const difficultyLabels = [
    document.getElementById('label-simple'),
    document.getElementById('label-average'),
    document.getElementById('label-difficult'),
];

const difficultyMap = {
    'Простой': {
        'class': 'three-card-game',
        'cardNumber': 3,
    },
    'Средний': {
        'class': 'six-card-game',
        'cardNumber': 6,
    },
    'Сложный': {
        'class': 'ten-card-game',
        'cardNumber': 10,
    },
}

let clickOnCard = false;

difficultyLabels.forEach(difficultyButton => {
    difficultyButton.onclick = function() {
        difficultyLabels.forEach(difficultyButton => difficultyButton.classList.remove('level_active'));
        this.classList.add('level_active');
        difficulty = this.children[0].value;
    };
});

const createCards = (number, game) => {
    let randomCard = Math.floor(Math.random() * number);
    for (let i = 0; i < number; i++) {
        const cardWrapper = document.createElement('div');
        const cardBack = document.createElement('div');
        const cardBug = document.createElement('div');
        const cardGameover = document.createElement('div');
        if (i === randomCard) {
            cardWrapper.className = 'card-wrapper';
            cardWrapper.classList.add('card-wrapper_hover');
            game.append(cardWrapper);
            cardBack.className = 'card-back';
            cardWrapper.append(cardBack);
            cardBug.className = 'card-bug';
            cardWrapper.append(cardBug);
        } else {
            cardWrapper.className = 'card-wrapper';
            cardWrapper.classList.add('card-wrapper_hover');
            game.append(cardWrapper);
            cardBack.className = 'card-back';
            cardWrapper.append(cardBack);
            cardGameover.className = 'card-gameover';
            cardWrapper.append(cardGameover);
        }
    }
};

const startButton = document.getElementById('button');

startButton.addEventListener('click', () => {
    const levelsMenu = document.getElementById('levels-menu');
    const levelsParams = difficultyMap[difficulty];
    const gameField = document.createElement('div');
    gameField.className = levelsParams['class'];
    document.body.append(gameField);

    createCards(levelsParams['cardNumber'], gameField);

    levelsMenu.style.display = 'none';

    document.querySelectorAll('.card-wrapper').forEach(card => {
        card.addEventListener('click', () => {
            if (clickOnCard) {
                gameField.style.display = 'none';
                levelsMenu.style.display = '';
                clickOnCard = false;
            } else {
                card.classList.add('card-click');
                card.classList.remove('card-wrapper_hover');
                clickOnCard = true;
            }
        });
    });
});
