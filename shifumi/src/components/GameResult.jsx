import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function GameResult({ winner }) {

  return (
    <div>
      <h1>La partie est finie ! :-/ </h1>
      <p>Vainqueur: {winner.username}</p>
      <Link to="/">Retour à la page d'accueil</Link>
    </div>
  );
}


export default GameResult;