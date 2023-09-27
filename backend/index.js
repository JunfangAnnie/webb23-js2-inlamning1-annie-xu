const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('frontend/src'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function readHighscores() {
  try {
    const highscoresData = fs.readFileSync('./data/highscores.json', 'utf8');
    return JSON.parse(highscoresData);
  } catch (error) {
    return [];
  }
}

function writeHighscores(highscores) {
  try {
    const highscoresData = JSON.stringify(highscores, null, 2);
    fs.writeFileSync('./data/highscores.json', highscoresData, 'utf8');
  } catch (error) {
    console.error('Error writing highscores to file:', error);
  }
}

app.get('/', (req, res) => {
  res.send({
    message: "Hello User"
  })
}) 

app.post("/", (req, res) => {
  res.send("Failed")
})

app.get('/highscores', (req, res) => {
  const highscores = readHighscores();
  res.status(200).json(highscores);
});

app.post('/highscores', (req, res) => {
  const { name, score } = req.body;
  if (!name || !score) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const highscores = readHighscores();
  highscores.push({ name, score });
  
  highscores.sort((a, b) => {
    if (a.score === b.score) {
      return a.name.localeCompare(b.name);
    }
    return b.score - a.score;
  });

  highscores.splice(5);

  writeHighscores(highscores);

  res.json({ message: 'Highscore tillagd', highscores });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
