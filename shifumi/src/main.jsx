import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Authentification from './components/Authentification.jsx';
import Game from './components/Game.jsx';


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Authentification/>,
  },
  {
    path: "/game",
    element: <Game/>
  },
  {
    path: "/",
    element: <App/>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
