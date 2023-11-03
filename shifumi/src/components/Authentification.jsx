import React from 'react';
import { useState } from 'react';
import { Stack } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";

export default function Authentification() {
    const navigate = useNavigate();

    const handleLogin = (userInfo) => {
        console.log('login');
        fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate("/home");
            });

    };

    const handleRegister = (userInfo) => {
        console.log('register');
        fetch('http://localhost:3002/register', {
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