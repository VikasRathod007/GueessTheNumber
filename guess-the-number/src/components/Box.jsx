import React, { useState, useRef } from 'react';
import Button from '@mui/joy/Button';
import './Box.css';
import gif0 from './Gifs/dance.gif';
import gif1 from './Gifs/Borat.gif';
import gif2 from './Gifs/GreatSuccess.gif';
import gif3 from './Gifs/No.gif';
import gif4 from './Gifs/sad.gif';
import gif5 from './Gifs/doubt.gif';
import gif6 from './Gifs/First.gif';
import gif7 from './Gifs/Really.gif';
import gif8 from './Gifs/Yes.gif';

const GuessTheNumberGame = () => {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [showGif, setShowGif] = useState(false);
  const inputRef = useRef(null);
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [Gif, SendGif] = useState();
  const maxAttempts = 5;
  const success = [gif0, gif1, gif2, gif8, gif6];
  const failure = [gif3, gif4, gif5, gif7];
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  function handleSuccessGif() {
    const randomIndex = Math.floor(Math.random() * success.length);
    SendGif(success[randomIndex]);
  }

  function handleFailureGif() {
    const randomIndex = Math.floor(Math.random() * failure.length);
    SendGif(failure[randomIndex]);
  }

  function FirstTry() {
    SendGif(success[4]);
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleInputChange = (event) => {
    setUserGuess(event.target.value);
  };

  const handleGuess = () => {
    const guess = userGuess;

    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);
    setShowGif(true); // Set showGif to true when the user enters a valid guess

    if (Number(guess) === secretNumber) {
      setFeedback(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`);
      handleSuccessGif();
      return;
    } else if (guess < secretNumber) {
      setFeedback('Too low! Try again.');
      handleFailureGif();
    } else {
      setFeedback('Too high! Try again.');
      handleFailureGif();
    }

    if (attempts === maxAttempts) {
      setFeedback(`Sorry, you've reached the maximum number of attempts. The correct number was ${secretNumber}.`);
      handleFailureGif();
      return;
    }
  };

  return (
    <>
      <div>
        <div className='box'>
          <p>{feedback}</p>
          <input type="number" min={1} max={100} value={userGuess} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
          <br />
          <button onClick={handleGuess} className="button-1" type='submit'>
            Guess
          </button>
        </div>
        <div>
          {showGif && <img className='gif' src={Gif} alt="" />}
        </div>
      </div>
    </>
  );
};

export default GuessTheNumberGame;
