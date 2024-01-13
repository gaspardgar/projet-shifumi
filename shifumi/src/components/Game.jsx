import { useState } from 'react';
import { useEffect } from 'react';
import GameItem from './GameItem';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
// import EventSource from 'eventsource';

export default function Game(...props) {
  const { gameId } = useParams();
  const [userChoice, setUserChoice] = useState('');
  const [user2Choice, setUser2Choice] = useState('');
  const [result, setResult] = useState('');
  const [nextTurnNumber, setNextTurnNumber] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  //   {
  //     "_id": "65a056fd1e6920cd6e58ddd4",
  //     "user1": {
  //         "_id": "1f7043ae-8263-4f72-899a-f37c412ff96a",
  //         "username": "lucas_test",
  //         "iat": 1704990969,
  //         "exp": 1736548569
  //     },
  //     "user2": {
  //         "_id": "015a2d3e-8316-458e-91e1-f3cdeacd0e42",
  //         "username": "rob1",
  //         "iat": 1705005037,
  //         "exp": 1736562637
  //     },
  //     "turns": [
  //         {
  //             "user2": "rock",
  //             "user1": "rock",
  //             "winner": "draw"
  //         }
  //     ],
  //     "__v": 0
  // }
  // 65a056fd1e6920cd6e58ddd4


  useEffect(() => {
    fetch('http://fauques.freeboxos.fr:3000/matches/' + gameId, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNextTurnNumber(data.turns.length + 1);
        if (data.turns.length > 0) {
          setUserChoice(data.turns[data.turns.length - 1].user1);
        }
      });


    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource('http://fauques.freeboxos.fr:3000/matches/' + gameId + '/subscribe', {
      headers: {
        "Authorization": "Bearer " + Cookies.get('token'),
      },
    });


    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      console.log(event);
      if (gameId === event.matchId) {
        if (event.type === "NEW_TURN") {
          setNextTurnNumber(event.payload.turnId);
        } else if (event.type === "TURN_ENDED") {
          setNextTurnNumber(event.payload.newTurnId);
          // "winner_username", // "winner_username"|"draw",
          if (event.payload.winner === "draw") {
            setResult("Egalité");
          } else {
            setResult(event.payload.winner.substring(7));
          }
        } else if (event.type === "PLAYER_MOVED") {

        } else if (event.type === "MATCH_ENDED") {
          if (event.payload.winner === "draw") {
            setResult("Egalité");
          } else {
            setResult(event.payload.winner.substring(7));
          }
        }
      };
    };
    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);


  const handleUserChoice = (choice) => {
    fetch('http://fauques.freeboxos.fr:3000/matches/' + gameId + '/turns/' + nextTurnNumber, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get('token'),
      },
      body: JSON.stringify({ "move": choice }),
    })
      .then((response) => response.json())
      .then((data) => {
        // if return status 400
        console.log(data);

        if (data === "{turn: \"move already given\"}") {
          setStatusMessage("Vous avez déjà joué attendez votre adversaire");
        } else if (data = "{turn: \"not last\"}") {
          setStatusMessage("Erreur ce n'est pas le bon tour");
        } else {
          setUserChoice(choice);
        }
      })
  };


  return (
    <>
      <h1>Game {gameId}</h1>
      <p>Manche {nextTurnNumber}</p>
      {statusMessage && <p>{statusMessage}</p>}
      <div style={{ backgroundColor: 'Tomato', padding: '30px' }}>
        <GameItem onChoice={handleUserChoice} />
        <p>Your choice: {userChoice}</p>
        <p>{result}</p>
      </div>
    </>
  );
}

