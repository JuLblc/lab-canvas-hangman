class HangmanCanvas {
  constructor(secretWord) {
    this.canvas = document.getElementById('hangman')
    this.context = this.canvas.getContext('2d');
    // ... your code goes here
    this.secretWord = secretWord;
    this.context.font = '35px sans serif';
  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
    this.drawLines();
  }

  drawLines() {
    // ... your code goes here
    let x = 300;
    this.context.beginPath();
    this.context.moveTo(x, 750);
    for (let i = 0; i < this.secretWord.length ; i++){
      x += 40;
      this.context.lineTo(x , 750);
      x += 10;
      this.context.moveTo(x, 750);      
    }
    this.context.stroke();
    // this.context.fillText("Errors left: ",this.canvas.width - 290,400);
  }

  writeCorrectLetter(letter,pos) {
    // ... your code goes here    
    let x = 305 + pos * 50;    
    this.context.fillText(letter.toUpperCase(),x, 745);
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    let x = (this.canvas.width - 50) - ((errorsLeft+1) * 30);
    let y = 350;
    this.context.clearRect(1070, 350, 100, 100);
    this.context.fillText(errorsLeft,1070, y + 50);
    this.context.fillText(letter.toUpperCase(),x, y);
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    
    this.context.beginPath();
    
    switch (errorsLeft) {
      case 7 :
        this.context.fillText("Errors left: ",this.canvas.width - 290,400);
        this.context.moveTo(200, 750);
        this.context.lineTo(280 , 750);
        this.context.lineTo(240 , 720);
        break;
      case 6 :
        this.context.moveTo(240 , 720);
        this.context.lineTo(240 , 420);
        break;
      case 5 :
        this.context.moveTo(240 , 420);
        this.context.lineTo(380,420);
        break;
      case 4 :
        this.context.moveTo(380,420);
        this.context.lineTo(380,480);
        break;
      case 3 :
        this.context.moveTo(380,480);
        this.context.arc(380, 510, 30,-Math.PI/2, Math.PI*2);
        break;
      case 2 :
        this.context.moveTo(380,540);
        this.context.lineTo(380,600);
        break;
      case 1 :
        this.context.moveTo(380,600);
        this.context.lineTo(360,640);
        break;
      case 0 :
        this.context.moveTo(380,600);
        this.context.lineTo(400,640);
        break;
    }
    this.context.closePath();
    this.context.stroke();
  }

  gameOver() {
    // ... your code goes here
    this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
    document.querySelector('.looser').style.visibility = "visible";
  }

  winner() {
    // ... your code goes here
    this.context.clearRect(0, 0, this.canvas.width,  this.canvas.height);
    document.querySelector('.winner').style.visibility = "visible";
  }
}
