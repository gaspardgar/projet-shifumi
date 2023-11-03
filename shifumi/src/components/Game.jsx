import React, { useState } from 'react';
import GameItem from './GameItem';

export default function Game() {
  const [userChoice, setUserChoice] = useState(null);
  const [user2Choice, setUser2Choice] = useState(null);
  const [result, setResult] = useState('');

  const handleUserChoice = (choice) => {
    const choices = ['rock', 'paper', 'scissors'];

    let result;
    if (choice === user2Choice) {
      result = 'It\'s a tie!';
    } else if (
      (choice === 'rock' && user2Choice === 'scissors') ||
      (choice === 'paper' && user2Choice === 'rock') ||
      (choice === 'scissors' && user2Choice === 'paper')
    ) {
      result = 'You win!';
    } else {
      result = 'You lose!';
    }

    setUserChoice(choice);
    setResult(result);
  };

  return (
    <div>
      <GameItem onChoice={handleUserChoice} />
      <p>Adversary choice: {user2Choice}</p>
      <p>{result}</p>
    </div>
  );
}

