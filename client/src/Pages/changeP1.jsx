import React ,{ useState, useContext, createContext} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {FormHelperText, ThemeProvider, Container, CssBaseline, Box, Avatar, 
Typography, TextField, Button, Grid,} from '@mui/material';
import a from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';
import {Link, useNavigate } from 'react-router-dom';
import { SomeContext } from '../App';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <a color="inherit" href="https://mui.com/">
          Your Website
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const theme = createTheme();
  
function ChangePasswordOne() {
  const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const [email, passkey] =  [data.get('email'), data.get('passkey')];
        const result = await fetch('http://localhost:3000/api/changePasswordOne', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email, passkey
          })//
      }).then(res => res.json())
      console.log(result);
      if(result.status === 'ok') {
       console.log(result.data);
       setTimeout(() => navigate('../ChangePasswordTwo', {replace: true}), 500);
      } else {
        alert(result.error);
      }
    }
    return (
        <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
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
              name="passkey"
              label="Passkey"
              type="password"
              id="passkey"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {`next  ->`}
            </Button>
            <Grid container>
              <Grid item>
                <a href="#"
                 variant="body2"
                 onClick={() => setTimeout(() => navigate('../signup', {replace: true}), 500)}
                 >
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )
}

export default ChangePasswordOne;