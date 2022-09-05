import React, { useState, useEffect } from "react"
import {User} from "../../requests"
import { useNavigate } from "react-router-dom";


//sign up desing
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const SignUpPage = (props) => {
    const { onSignUp } = props;
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(()=>{console.log("SignUpPage")})
    function handleSubmit(event){
        event.preventDefault();
        const params = {
            email: email,
            password: password
        }
        User.signup(params).then(data => {
            console.log(data)
            onSignUp(data)
            navigate("/")
        })
    }
    return(
    <main>
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
              Sign Up
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
     
            
        </main>
    )
    
}
{/* <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={event => {
                        setEmail(event.currentTarget.value)}} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={event => {
                        setPassword(event.currentTarget.value)}} />
                </div>
                <input type="submit" value="Sign Up Bro!" />
            </form> */}