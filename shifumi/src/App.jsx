import { useState } from 'react'
import './App.css'
import { Stack } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

function App() {
  return (
    <>
      <h1>ShiFuMi in React</h1>
      <form>
      <FormControl>
        <Stack direction="column" spacing={1}>
          <Input placeholder="username" required />
          <Input placeholder="password" required />
          <Stack direction="row" spacing={3} justifyContent="space-evenly">
            <Button type="submit" onSubmit={handleLogin}>Login</Button>
            <Button type="submit" onSubmit={handleRegister}>Register</Button>
          </Stack>
        </Stack>
      </FormControl>
      </form>
    </>
  )
}

export default App
