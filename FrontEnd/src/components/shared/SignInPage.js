import React, { useEffect, useState } from "react";
import Navigation from "../NavBar";
import { User } from "../../requests"
import { useNavigate } from "react-router-dom";

//sign in design free template from some mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const SignInPage = ({ onSignIn }) => {
    const theme = createTheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();



    useEffect(() => { console.log("SignInPuage") })
    function handleSubmit(event) {
        event.preventDefault();

        const params = {
            email: email,
            password: password
        }

        User.signin(params)
            .then(data => {

                if (data?.user) {
                    onSignIn(params)
                    navigate("/")
                }
            })
    }
    return (
  
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
   
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

            </Box>
          </Box>
        </Container>
     
    );
}

{/* <div class="container">
                <div class="card">
                <h1 class="card_title">Login to your account</h1>
               
                </div>
        
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={event => {
                            setEmail(event.currentTarget.value)
                        }} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={event => {
                            setPassword(event.currentTarget.value)
                        }} />
                    </div>
                    <input type="submit" value="Sign In" />
                </form>
            </div> */}