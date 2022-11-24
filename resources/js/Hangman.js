class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a patameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy
   * To get an medium word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=medium
   * To get an hard word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
    return fetch(
      `https://hangman-micro-service.herokuapp.com?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  async start(difficulty, next) {
    // get word and set it to the class's this.word
    this.word = await this.getRandomWord(difficulty);
    // clear canvas
    this.clearCanvas();
    // draw base
    this.drawBase();
    // reset this.guesses to empty array
    this.guesses = [];
    // reset this.isOver to false
    this.isOver = false;
    // reset this.didWin to false
    this.didWin = false;
    next();
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    this.letter = letter;
    // Check if nothing was provided and throw an error if so
    if (letter === null) {
      console.Error(`Please enter a letter`);
    }

    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    if (letter.length !== 1 && letter.match(/[a-z]/)) {
      console.error(`Make sure you entered a letter`);
    }

    // Check if more than one letter was provided. throw an error if it is.
    if (letter.length !== 1) {
      console.error(`Please enter one letter`);
    }

    // if it's a letter, convert it to lower case for consistency.
    if (letter.length === 1 && letter.match(/[a-z]/)) {
      return letter.toLowerCase();
    }
    // check if this.guesses includes the letter. Throw an error if it has been guessed already.

    if (!this.guesses.includes(letter)) {
      //add the new letter to the guesses array.
      this.guesses.push(letter);
      //console.log("the arr " + this.guesses + " now includes " + letter )
    } else {
      throw new Error(`You have guessed this letter!`);
    }
    /* for (var i = 0; i < word.length; i++) {
      this.guesses[i] = "_";
    } */
    // check if the word includes the guessed letter:
    //    if it's is call checkWin()
    if(this.word.includes(letter)){
      this.checkWin();
    } else {
      //    if it's not call onWrongGuess()
      this.onWrongGuess();
    }
  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    let wordUnknowns =
      this.word
        .split(``)
        .filter(words => !this.guesses.includes(words)).length;
    console.log(wordUnknowns);

    // if zero, set both didWin, and isOver to true
    if (wordUnknowns == 0) {
      this.isOver = true;
      this.didWin = true;
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    const incorrectGuesses = this.guesses.filter(letter => !this.word.includes(letter)).length;
    
    // switch (incorrectGuesses) {
    //   case 1:
    //     this.drawHead()
    //     break;
    //   case 2:
    //     this.drawBody();
    //     break;
    // }
    if (incorrectGuesses == 1) {
      this.drawHead();
    }
    if (guessArr.length == 2) {
      this.drawBody();
    }
    if (guessArr.length == 3) {
      this.drawRightArm();
    }
    if (guessArr.length == 4) {
      this.drawLeftArm();
    }
    if (guessArr.length == 5) {
      this.drawRightLeg();
    }
    if (guessArr.length == 6) {
      this.drawLeftLeg();

      this.isOver = true;
      this.didWin = false;
    }

  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    this.word.split(``).map(letter => this.guesses.includes(letter) ? letter : `_`).join();
  }

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return `Guesses: ${this.guesses.join(`, `)}`;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base(top,nose,body,base)
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10);
    this.ctx.fillRect(245, 10, 10, 50);
    this.ctx.fillRect(95, 10, 10, 400);
    this.ctx.fillRect(10, 410, 175, 10);
  }

  drawHead() {
    console.log(`head`);
    this.ctx.beginPath();
    this.ctx.arc(250, 85, 25, 0, Math.PI * 2, false);
    this.ctx.stroke();
  }

  drawBody() {
    console.log(`body`);
    this.ctx.fillRect(245, 110, 10, 80, false);
  }

  drawRightArm() {
    console.log(`RightArm`);
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(330, 100);
    this.ctx.stroke();
  }


  drawLeftArm() {
    console.log(`LeftArm`);
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(170, 100);
    this.ctx.stroke();

  }

  drawLeftLeg() {
    console.log(`LeftLeg`);
    this.ctx.beginPath();
    this.ctx.moveTo(245, 190);
    this.ctx.lineTo(170, 250);
    this.ctx.stroke();
  }

  drawRightLeg() {
    console.log(`RightLeg`);
    this.ctx.beginPath();
    this.ctx.moveTo(255, 190);
    this.ctx.lineTo(330, 250);
    this.ctx.stroke();


  }
}
