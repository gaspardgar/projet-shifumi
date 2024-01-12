import React from 'react';
import './App.css';
import Authentification from './components/Authentification';
import Game from './components/Game';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import GameList from './components/GameList';
import HomePage from './components/Homepage';

function App() {


  return (
    <>
    <HomePage/>
    </>
  );
 
}

export default App;
