import React from 'react';
import { useState } from 'react';
import { Stack } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Authentification() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleLogin = (userInfo) => {
        console.log('login');
        fetch('http://fauques.freeboxos.fr:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                // detec if server returns 401


                if (data == "Unauthorized") {
                    setMessage("Mauvais mot de pass ou nom d'utilisateur");
                }
                Cookies.set('token', data.token);
                navigate("/");
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    const handleRegister = (userInfo) => {
        console.log('register');
        fetch('http://fauques.freeboxos.fr:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userInfo = {
            username: event.target[0].value,
            password: event.target[1].value,
        };
        if (event.nativeEvent.submitter.name === 'login') {
            handleLogin(userInfo);
        } else if (event.nativeEvent.submitter.name === 'register') {
            handleRegister(userInfo);
        }
    };

    return (
        <>
        <h1>ShiFuMi in React</h1>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={1}>
                    <Input placeholder="username" required />
                    <Input placeholder="password" required />
                    {message && <Text>{message}</Text>}
                    <Stack direction="row" spacing={3} justifyContent="space-evenly">
                        <Button type="submit" name="login">
                            Login
                        </Button>
                        <Button type="submit" name="register">
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </>
    );

}