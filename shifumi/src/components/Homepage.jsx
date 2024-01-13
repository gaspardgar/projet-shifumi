import React from 'react';
import { Link } from 'react-router-dom';
import GameList from './GameList';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Link as MuiLink } from '@mui/joy';

function HomePage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log('useEffect HOMEPAGE');
    if (!Cookies.get('token')) {
      navigate("/auth");
    } else {
      retrieveGames();
    }
  }, []);

  const retrieveGames = () => {
    fetch('http://fauques.freeboxos.fr:3000/matches', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + Cookies.get('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('GET /matches');
        console.log(data);
        setGames(data.reverse());
      });
  };


  const handleCreateGame = () => {
    fetch('http://fauques.freeboxos.fr:3000/matches', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('POST /matches');
        console.log(data);
        retrieveGames();
      });
  };



  return (
    <div>
      <h1>Shifumi</h1>
      <Button onClick={handleCreateGame}>Rejoindre une nouvelle partie</Button>
      <GameList games={games} />
    </div>
  );
}

export default HomePage;