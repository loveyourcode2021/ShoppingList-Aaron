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
        const {currentTarget} = event
        const formData = new FormData(currentTarget)
        const params = {
            email: formData.get("email"),
            password: formData.get("password")
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
                Sign Up
              </Button>

            </Box>
          </Box>
        </Container>
     
            
        </main>
    )
    
}
