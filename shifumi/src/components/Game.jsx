import { useState } from 'react';
import { useEffect } from 'react';
import GameItem from './GameItem';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

export default function Game(...props) {
  const { gameId } = useParams();
  const [userChoice, setUserChoice] = useState('');
  const [user2Choice, setUser2Choice] = useState('');
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [user2Score, setUser2Score] = useState(0);
  var nextTurnNumber = 1;

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
        nextTurnNumber = data.turns.length + 1;
      });
  }
  , []);

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
        console.log(data);
        setUserChoice(data.turns[nextTurnNumber - 1].user1);
        setUser2Choice(data.turns[nextTurnNumber - 1].user2);
        //a
        setUserChoice(userChoice);
        setUser2Choice(user2Choice);

        //Update des scores
        if ((userChoice === 'rock' && user2Choice === 'scissors') ||
        (userChoice === 'scissors' && user2Choice === 'paper') ||
        (userChoice === 'paper' && user2Choice === 'rock')) {
      setUserScore(userScore + 1);
    } else if (userChoice !== user2Choice) {
      setUser2Score(user2Score + 1);
    }
      });
  };


  return (
    <div style={{ backgroundColor: 'Tomato', padding: '30px' }}>
        <GameItem onChoice={handleUserChoice} />
        <p>Adversary choice: {user2Choice}</p>
        <p>Your score: {userScore}</p>
        <p>Adversary score: {user2Score}</p>
        <p>{result}</p>
    </div>
  );
}

