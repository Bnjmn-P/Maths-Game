import React, { useState, useEffect } from 'react';

function MathGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [useTimer, setUseTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [timer, setTimer] = useState(null); // Define timer here

  useEffect(() => {
    resetGame();
  }, []);

  function resetGame() {
    setScore(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);

    const timerConfirmation = window.confirm(
      'Do you want to challenge yourself and play with a 10-second time limit?'
    );
    setUseTimer(timerConfirmation);
    generateQuestion();

    if (timerConfirmation) {
      startTimer();
    }
  }

  function generateQuestion() {
    const newNum1 = Math.floor(Math.random() * 12) + 1;
    const newNum2 = Math.floor(Math.random() * 12) + 1;

    setNum1(newNum1);
    setNum2(newNum2);

    if (useTimer) {
      setRemainingTime(10);
    }
  }

  function startTimer() {
    if (timer) {
      clearInterval(timer);
    }

    const newTimer = setInterval(() => {
      setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : prevTime));

      if (remainingTime === 0) {
        clearInterval(newTimer);
        checkAnswer(9999);
      }
    }, 1000);

    setTimer(newTimer);
  }

  function checkAnswer(userAnswer) {
    clearInterval(timer);

    if (remainingTime === 0) {
      userAnswer = 9999;
    }

    const answer = num1 * num2;

    setTotalQuestions(prev => prev + 1);

    if (userAnswer === answer) {
      setScore(prevScore => prevScore + 1);
      setCorrectAnswers(prevCorrect => prevCorrect + 1);

      if (useTimer) {
        startTimer();
      }
    } else {
      alert(
        `Incorrect! Looks like you got that one wrong!\n` +
          `The correct answer is ${answer}\n` +
          `Your score: ${score}\n` +
          `Total Questions: ${totalQuestions}`
      );

      const playAgain = window.confirm('Do you want to try again?');

      if (playAgain) {
        resetGame();
      } else {
        window.close();
      }
    }

    generateQuestion();
  }

  return (
    <div className="container">
      <h1>Miss L's Mathematics - Multiplication Game</h1>
      <label htmlFor="answer">Answer:</label>
      <input
        type="text"
        id="answer"
        value={''}
        onChange={() => {}}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            checkAnswer(parseInt(e.target.value.trim()));
          }
        }}
      />
      <button
        className="btn"
        onClick={() => checkAnswer(parseInt(document.getElementById('answer').value.trim()))}
      >
        Submit
      </button>
      <div className="result"></div>
      <div className="score">Score: {score}</div>
      <div className="questions">Total Questions: {totalQuestions}</div>
      {useTimer && <div className="timer">Time: {remainingTime}</div>}
    </div>
  );
}

export default MathGame;
