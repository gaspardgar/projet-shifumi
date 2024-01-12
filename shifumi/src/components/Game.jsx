import { useState } from 'react';
import GameItem from './GameItem';

export default function Game() {
  const [userChoice, setUserChoice] = useState('');
  const [user2Choice, setUser2Choice] = useState('');
  const [result, setResult] = useState('');

  const handleUserChoice = (choice) => {
    const choices = ['pierre', 'feuille', 'ciseaux'];

    const handleSelection = (option) => {
        if (!playerOneChoice) {
          setPlayerOneChoice(option);
        } else if (!playerTwoChoice) {
          setPlayerTwoChoice(option);
        }
      };
    
    setUser2Choice("pierre");

    let result;
    if (choice === user2Choice) {
      result = 'Egalité !';
    } else if (
      (choice === 'pierre' && user2Choice === 'ciseaux') ||
      (choice === 'papier' && user2Choice === 'pierre') ||
      (choice === 'ciseaux' && user2Choice === 'papier')
    ) {
      result = 'Gagné !';
    } else {
      result = 'Perdu !';
    }

    setUserChoice(choice);
    setResult(result);
  };

  

  return (
    <div style={{ backgroundColor: 'Tomato', padding: '30px' }}>
        <GameItem onChoice={handleUserChoice} />
        <p>Adversary choice: {user2Choice}</p>
        <p>{result}</p>
    </div>
  );
}

