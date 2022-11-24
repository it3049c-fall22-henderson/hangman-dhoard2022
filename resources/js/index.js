// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);

// The following Try-Catch Block will catch the errors thrown
try {
  // Instantiate a game Object using the Hangman class.
  let game = new Hangman(canvas);

  // add a submit Event Listener for the to the difficultySelectionForm
  difficultySelectForm.addEventListener(`submit`, function (event) {
    event.preventDefault();
    //get the difficulty input
    const difficutyLevel = difficultySelect.value;
    // call the game start() method, the callback function should do the following
    game.start(difficutyLevel, function () {
      //1. hide the startWrapper
      startWrapper.classList.add(`hidden`);
      //2. show the gameWrapper
      gameWrapper.classList.remove(`hidden`);
      //3. call the game getWordHolderText and set it to the wordHolderText
      wordHolderText.innerText = game.getWordHolderText();
      // 4. call the game getGuessessText and set it to the guessesText
      guessesText.innerText = game.getGuessesText();
    });
  });

  // add a submit Event Listener to the guessForm
  guessForm.addEventListener(`submit`, function (e) {
    e.preventDefault();
    //1.get the guess input
    const guessedletter = guessInput.value;
    //2.call the game guess() method
    game.guess(guessedletter);
    //3.set the wordHolderText to the game.getHolderText
    wordHolderText.innerText = game.getWordHolderText();
    //4.set the guessesText to the game.getGuessesText
    guessesText.innerText = game.getGuessesText();
    //5.clear the guess input field
    guessInput.value = `_`;

    // Check if the game isOver:
    if (game.isOver) {
      // disable the guessInput 
      guessInput.setAttribute(`disabled`, `disabled`);
      //disable the guessButton
      guessButton.setAttribute(`disabled`, `disabled`);
      //show the resetGame button
      resetGame.classList.remove(`hidden`);
      console.log(`Sorry! Game Over`);
      // if the game is won or lost, show an alert.
      if (game.didWin) {
        alert(`Wohoo! You WON!`);
      } else {
        alert(`You Lost :( `);
      }
    }

  });
  // add a click Event Listener to the resetGame button
  resetGame.addEventListener(`click`, function (e) {
    //how the startWrapper
    startWrapper.classList.remove(`hidden`);
    //hide the gameWrapper
    gameWrapper.classList.add(`hidden`);
    guessInput.removeAttribute(`disabled`);
    guessButton.removeAttribute(`disabled`);
  });

} catch (error) {
  console.error(error);
  alert(error);
}

