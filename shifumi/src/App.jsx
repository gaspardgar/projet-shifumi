import React from 'react';
import './App.css';
import Authentification from './components/Authentification';
import Game from './components/Game';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the desired page as soon as the component is mounted
    if (!Cookies.get('token')) {
      navigate("/auth");
    }
  }, []);

  return(
    <>
    <h1>Hello World</h1>
    </>
  );
 
}

export default App;
