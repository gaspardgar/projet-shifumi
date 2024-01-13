import React from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Sheet } from '@mui/joy';


function GameResult({ winner }) {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  }

  return (
    <>
      <Sheet variant="soft" color="success" sx={{ p: 4 }}>
        <h1>La partie est finie ! :-/ </h1>
        {winner === null ?
          <p>Match nul !</p>
          :
          <p>Le gagnant est {winner.username} !</p>
        }
        <Button onClick={handleNavigateToHome} variant="solid" color="primary">
          Retour à la page d'accueil
        </Button>
        </Sheet>
    </>
  );
}


export default GameResult;