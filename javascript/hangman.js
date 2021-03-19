class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 8;

    // ... your code goes here
  }

  pickWord() {
    // ... your code goes here
    return this.words[Math.floor((Math.random() * this.words.length))]
  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    return (/[a-zA-Z]/).test(keyCode);
  }

  checkClickedLetters(letter) {
    // ... your code goes here
    return this.letters.includes(letter) ? false : true;
  }

  addCorrectLetter(letter) {
    // ... your code goes here
    this.guessedLetters += letter;
    console.log("lettre devinées:", this.guessedLetters);
  }

  addWrongLetter(letter) {
    // ... your code goes here
    this.errorsLeft--;
    this.letters.push(letter);
    console.log("tableau mauvaise lettre:", this.letters, "essais restants:", this.errorsLeft);
  }

  checkGameOver() {
    // ... your code goes here

    return this.errorsLeft === 0 ? true : false;
  }

  checkWinner() {
    // ... your code goes here
    return this.guessedLetters.length === this.secretWord.length ? true : false;
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {

    document.querySelector('.looser').style.visibility = "hidden";
    document.querySelector('.winner').style.visibility = "hidden";

    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    hangmanCanvas.createBoard();
    // ... your code goes here
    console.log("le mot à trouver est", hangman.secretWord);
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here

  let clickTouch = event.key;
  // Checker si lettre
  if (hangman.checkIfLetter(clickTouch)) {
    console.log(clickTouch, "est une lettre");
    // Checker si dans le secret mot
    let pos = hangman.secretWord.indexOf(clickTouch);
    if (pos !== -1) {
      //boucle sur chaque lettre du mot
      console.log(clickTouch, "fait partie du mot");

      while (pos !== -1) {
        hangman.addCorrectLetter(clickTouch);
        hangmanCanvas.writeCorrectLetter(clickTouch, pos);
        pos = hangman.secretWord.indexOf(clickTouch, pos + 1);
      }

      // Gagné?
      if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      }
    } else {
      // checker si deja clicker auparavant
      console.log("test mauvaise lettre déjà testée", hangman.checkClickedLetters(clickTouch));
      if (hangman.checkClickedLetters(clickTouch)) {
        hangman.addWrongLetter(clickTouch);
        hangmanCanvas.writeWrongLetter(clickTouch, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);
      }
      // Perdu ?
      if (hangman.checkGameOver()) {
        hangmanCanvas.gameOver();
      }
    }
  }
});
