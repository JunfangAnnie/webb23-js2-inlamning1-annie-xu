let playerScore = 0;
let playerName = "";
let playerChoice = "";
let computerScore = 0;

const playerNameInput = document.getElementById("playerNameInput");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const startButton = document.getElementById("startButton");
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorBtn = document.querySelector(".scissor");
const playerHandEl = document.querySelector(".playerHand");
const computerHandEl = document.querySelector(".computerHand");
const playerEl = document.querySelector(".p-count");
const computerEl = document.querySelector(".c-count");
const winnerMsg = document.getElementById("winnerMessage");
const highscoreList = document.getElementById("highscore-list");

const url = "http://localhost:3000/highscores";
const playerOptions = [rockBtn, scissorBtn, paperBtn];
const computerOptions = ["Sten", "Sax", "Påse"];
const highscores = [];

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  const name = playerNameInput.value.trim();

  if (name !== "") {
    playerName = name;
    playerNameDisplay.textContent = playerName;

    startGame();
  } else {
    alert("Vänligen, ange ett valfritt namn :)");
  }
});

function startGame() {
  playerOptions.forEach((option) => {
    option.addEventListener("click", playGame);
  });

  playerScore = 0;
  computerScore = 0;
}

  function playGame(event) {
    computerHandEl.innerHTML = "";
    playerChoice = event.target.textContent;
    let computerChoice = computer();

      if(computerChoice === playerChoice) {
        winnerMsg.innerText = "Oavgjort, fortsätt spela!"; 
      } else if (computerChoice === "Sax" && playerChoice === "Sten") {
        playerScore++;
        console.log('Du vinner')
        winnerMsg.innerText = "Du vinner och får ett poäng";
      } else if (computerChoice === "Påse" && playerChoice === "Sax") {
        playerScore++;
        console.log('Du vinner')
        winnerMsg.innerText = "Du vinner och får ett poäng";
      } else if (computerChoice === "Sten" && playerChoice === "Påse") {
        playerScore++;
        console.log('Du vinner')
        winnerMsg.innerText = "Du vinner och får ett poäng";
      } else {
        computerScore++;
        if (playerScore > 0) {
          alert(`Du fick ${playerScore} poäng. Försök igen!`);
        }
        winnerMsg.innerText = "Datorn vinner och poängen återställs";
        updateHighscore();
        resetGame();
      }

      playerEl.innerHTML = `Dina poäng: ${playerScore}`;
      playerHandEl.innerHTML = `Ditt val: ${playerChoice}`;
      computerHandEl.innerHTML = `Datorns val: ${computerChoice}`;
    }
      

function computer() {
  let totalOptions = Math.floor(Math.random() * 3);
  let computerChoice = computerOptions[totalOptions];
  return computerChoice;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
}

async function getHighscores() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network not response");
    }
    const highscoreData = await response.json();
    displayHighscores(highscoreData);
  } catch (error) {
    console.error("Error fetching highscores:", error);
  }
}

function displayHighscores(highscoreData) {
  highscoreList.innerHTML = "";

  highscoreData.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${score.name} ...... ${score.score}`;
    highscoreList.appendChild(listItem);
  });
}

async function postPlayer() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: playerName, score: playerScore }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
}

function updateHighscore() {
  postPlayer();
  getHighscores();
}