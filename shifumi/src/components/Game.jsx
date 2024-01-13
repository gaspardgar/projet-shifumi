import { useState } from 'react';
import { useEffect } from 'react';
import GameItem from './GameItem';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import GameResult from './GameResult';
// import EventSource from 'eventsource';

export default function Game(...props) {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState({});
  const [userChoice, setUserChoice] = useState('');
  const [user2Choice, setUser2Choice] = useState('');
  const [result, setResult] = useState('');
  const [nextTurnNumber, setNextTurnNumber] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');


  const getGame = () => {
    console.log('getGame')
    fetch('http://fauques.freeboxos.fr:3000/matches/' + gameId, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGameData(data);
        console.log(data);

        let currentMove = 0;
        data.turns.forEach(turn => {
          if (turn.winner) {
            currentMove++;
          }
        });
        setNextTurnNumber(currentMove === 0 ? 1 : currentMove + 1);

        var resultstring = "";
        console.log("GET RESULT CODe")
        data.turns.forEach(turn => {
          if (turn.winner) {
            if (turn.winner === "draw") {
              resultstring += "Egalité - ";
            } else {
              resultstring += turn.winner + " - ";
            }
          }
        });
        setResult(resultstring);

        // if (data.turns.length > 0) {
        //   console.log(data.turns[nextTurnNumber-1]);
        //   console.log(nextTurnNumber-1);
        //   setUserChoice(data.turns[nextTurnNumber-1].user1);
        //   setUser2Choice(data.turns[nextTurnNumber-1].user2);
        // }
      });
  }

  useEffect(() => {
    getGame();

    const interval = setInterval(() => {
      getGame();
    }, 5000);

    return () => clearInterval(interval);
    /* work for notifications (not working for now)
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
        */
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
          setStatusMessage("");
          setUserChoice(choice);
        }
      })
    getGame();
  };


  return (
    <>
      <h1>Game {gameId}</h1>
      <div style={{ backgroundColor: 'Tomato', padding: '30px' }}>
        {nextTurnNumber > 3 ?
          <>
            <p>Manche {nextTurnNumber}</p>
            {statusMessage && <p>{statusMessage}</p>}
            <GameResult winner={gameData.winner} />
          </>
          :
          <>
            <GameItem onChoice={handleUserChoice} />
          </>
        }
        {/* <p>User1 choice: {userChoice}</p>
        <p>User2 choice: {user2Choice}</p> */}
        <p>Winners: {result}</p>
      </div>
    </>
  );
}

