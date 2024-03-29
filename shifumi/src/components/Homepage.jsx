import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, Link as MuiLink } from '@mui/joy';
import GameList from './GameList';


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
    <>
    <Button color="warning" onClick={() => { Cookies.remove('token'); navigate("/auth"); }}>Déconnexion</Button>
    <div>
      <h1>Shifumi</h1>
      <Button onClick={handleCreateGame}>Rejoindre une nouvelle partie</Button>
      <GameList games={games} />
    </div>
    </>
  );
}

export default HomePage;