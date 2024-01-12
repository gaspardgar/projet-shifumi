import React from 'react';
import { Link } from 'react-router-dom';
import GameList from './GameList';

function HomePage({ games }) {
  return (
    <div>
      <h1>hifumi</h1>
      <Link to="/game">Jouer</Link>
      <GameList games={games} />
    </div>
  );
}

export default HomePage;