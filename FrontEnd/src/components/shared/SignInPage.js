import React, { useEffect, useState } from "react";
import Navigation from "../NavBar";
import { User } from "../../requests"
import { useNavigate } from "react-router-dom";

//sign in design free template from some mui

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export const SignInPage = ({ onSignIn }) => {

    let navigate = useNavigate();



    useEffect(() => { console.log("SignInPuage") })
    function handleSubmit(event) {
      const {currentTarget} = event
        event.preventDefault();
        const formData = new FormData(currentTarget)
        const params = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        console.log(params)
        User.signin(params)
            .then(data => 
            {
                console.log("got data")
                if (data?.user) {
                    console.log("singin==",data)
                    onSignIn(data)
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

