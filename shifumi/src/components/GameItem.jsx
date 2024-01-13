import React from 'react';

export default function GameItem({ onChoice }) {
  const handleItemClick = (choice) => {
    onChoice(choice);
  };

  return (
    <div>
      <button onClick={() => handleItemClick('rock')}>Pierre</button>
      <button onClick={() => handleItemClick('paper')}>Papier</button>
      <button onClick={() => handleItemClick('scissors')}>Ciseaux</button>
    </div>
  );
}
