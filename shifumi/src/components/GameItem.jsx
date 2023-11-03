import React from 'react';

export default function GameItem({ onChoice }) {
  const handleItemClick = (choice) => {
    onChoice(choice);
  };

  return (
    <div>
      <button onClick={() => handleItemClick('pierre')}>Pierre</button>
      <button onClick={() => handleItemClick('papier')}>Papier</button>
      <button onClick={() => handleItemClick('ciseaux')}>Ciseaux</button>
    </div>
  );
}

