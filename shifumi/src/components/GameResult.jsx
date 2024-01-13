import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';



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