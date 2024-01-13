import React from 'react';
import PropTypes from 'prop-types';
import myGames from './Game';
import { Table } from '@mui/joy';
import { Button } from '@mui/joy';
import { useNavigate } from "react-router-dom";

function GameList({ games }) {
    const navigate = useNavigate();

    const handleNavigateToGame = (gameId) => {
        navigate(`/game/${gameId}`);
    };
    // [{"_id":"65a026ea1e6920cd6e58dcd0","user1":{"_id":"1f7043ae-8263-4f72-899a-f37c412ff96a","username":"lucas_test","iat":1704990969,"exp":1736548569},"user2":{"_id":"015a2d3e-8316-458e-91e1-f3cdeacd0e42","username":"rob1","iat":1705005037,"exp":1736562637},"turns":[{"user2":null}],"__v":0},{"_id":"65a056fd1e6920cd6e58ddd4","user1":{"_id":"1f7043ae-8263-4f72-899a-f37c412ff96a","username":"lucas_test","iat":1704990969,"exp":1736548569},"user2":{"_id":"015a2d3e-8316-458e-91e1-f3cdeacd0e42","username":"rob1","iat":1705005037,"exp":1736562637},"turns":[{"user2":"rock","user1":"rock","winner":"draw"},{"user2":"rock","user1":"paper","winner":"user1"},{"user2":"rock"}],"__v":0}]
    return (
        <>
            <div>
                <h1>Liste des parties</h1>
                <Table variant='solid' size='lg' >
                    <thead>
                        <tr>
                            <th>Partie (id)</th>
                            <th>Joueur 1</th>
                            <th>Joueur 2</th>
                            <th>Statut (user1-draw-user2)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'left' }}>Partie {index + 1} ({game._id})</td>
                                <td style={{ textAlign: 'left' }}>{game.user1.username}</td>
                                <td style={{ textAlign: 'left' }}>{game.user2 ? game.user2.username : 'En attente d\'un joueur'}</td>
                                <td style={{ textAlign: 'left' }}>
                                    {/* counts user1 wins */}
                                    {game.turns.filter(turn => turn.winner === "user1").length}
                                    -
                                    {/* counts draws */}
                                    {game.turns.filter(turn => turn.winner === 'draw').length}
                                    -
                                    {/* counts user2 wins */}
                                    {game.turns.filter(turn => turn.winner === "user2").length}
                                </td>
                                <td style={{ textAlign: 'left' }}>
                                    <Button onClick={() => handleNavigateToGame(game._id)} variant="solid" color="primary">
                                        Rejoindre
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default GameList;