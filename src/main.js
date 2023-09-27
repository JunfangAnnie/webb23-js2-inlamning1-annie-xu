let playerScore = 0;
let playerName = '';
let playerChoice = '';
let computerScore = 0;

const playerNameInput = document.getElementById('playerNameInput');
const startButton = document.getElementById('startButton');
const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorBtn = document.querySelector('.scissor')
const playerHandEl = document.querySelector('.playerHand');
const computerHandEl = document.querySelector('.computerHand')
const playerEl = document.querySelector('.p-count')
const computerEl = document.querySelector('.c-count')
const winnerMsg = document.getElementById('winnerMessage');

const playerOptions = [rockBtn, scissorBtn, paperBtn];
const computerOptions = ['Sten', 'Sax', 'Påse'];
const highscores = [];


startButton.addEventListener('click', (event) => {
    event.preventDefault();
    const name = playerNameInput.value.trim();

    if (name !== '') {
        playerName = name;
        playerNameDisplay.textContent = playerName;
    }
});

const game = () => {
    playerOptions.forEach((option) => {
        option.addEventListener('click', () => {
            computerHandEl.innerHTML = '';
            playerChoice = option.textContent;
            let computerChoice = computer(); 

            if (computerChoice === 'Sten' && playerChoice === 'Påse') {
                playerScore++;
                winnerMsg.innerText = 'Du vinner och får ett poäng';
            } 
            
            else if (computerChoice === 'Sax' && playerChoice === 'Sten') {
                playerScore++;
                winnerMsg.innerText = 'Du vinner och får ett poäng';
            } 
            
            else if (computerChoice === 'Påse' && playerChoice === 'Sax') {
                playerScore++;
                winnerMsg.innerText = 'Du vinner och får ett poäng';
            } 
            
            else if (computerChoice === playerChoice) {
                winnerMessage.innerText = 'Oavgjort, fortsätt spela!';
                Test()

            } 
            
            else {
                computerScore++;
                winnerMsg.innerText = 'Datorn vinner och poängen återställs';
                updateHighscore();
                Test()
                resetGame();
            }

            playerEl.innerHTML = `Dina poäng: ${playerScore}`;
            playerHandEl.innerHTML = `Ditt val: ${playerChoice}`;
            computerHandEl.innerHTML = `Datorns val: ${computerChoice}`;
        });
    });
};

game();

const Test = async () => {
  await fetch(url, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
  },
  body: JSON.stringify(playerScoreObj)
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error sending data to backend:', error);
  });

}

let playerScoreObj = { 
  name: playerName,
  score: playerScore
};

const updateHighscore = () => {
    highscores.push(playerScoreObj);

    highscores.sort((a, b) => b.score - a.score);

    if (highscores.length > 5) {
        highscores.pop();
    }

    displayHighscores();
};

const displayHighscores = () => {
    const highscoreList = document.getElementById('highscore-list');
    highscoreList.innerHTML = '';

    highscores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${score.name} ...... ${score.score}`;
        highscoreList.appendChild(listItem);
    });
};


const computer = () => {
    let totalOptions = Math.floor(Math.random() * 3);
    let computerChoice = computerOptions[totalOptions];

    return computerChoice;
};


const resetGame = () => {
    playerScore = 0;
    computerScore = 0;
};


const highscoreList = document.getElementById('highscore-list');
const url = 'http://localhost:3000/highscores';

async function getHighscores() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network not response');
    }
    const highscores = await response.json();
    displayHighscores(highscores);
  } catch (error) {
    console.error('Error fetching highscores:', error);
  }
}

 