import React from 'react';

export default function GameItem({ onChoice }) {
  const handleItemClick = (choice) => {
    onChoice(choice);
  };

  return (
    <div>
      <button onClick={() => handleItemClick('rock')}>Rock</button>
      <button onClick={() => handleItemClick('paper')}>Paper</button>
      <button onClick={() => handleItemClick('scissors')}>Scissors</button>
    </div>
  );
}

