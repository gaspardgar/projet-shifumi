import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/joy';


function GameResult({ winner }) {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  }

  return (
    <>
      <div>
        <h1>La partie est finie ! :-/ </h1>
        <h2>Vainqueur: {winner.username}</h2>
        <Button onClick={handleNavigateToHome} variant="solid" color="primary">
          Retour à la page d'accueil
        </Button>
      </div>
    </>
  );
}


export default GameResult;