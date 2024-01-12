import React from 'react';
import PropTypes from 'prop-types';
import myGames from './Game';

<GameList games={myGames} />

function GameList({ games }) {
  return (
    <div>
      <h1>Liste des parties</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            Partie {index + 1}: {game.userChoice} vs {game.user2Choice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;