import React ,{ useState, useContext, createContext} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {FormHelperText,  Link, ThemeProvider, Container, CssBaseline, Box, Avatar, 
Typography, TextField, Button, Grid,} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { SomeContext } from '../App';
import Copyright from "../Components/Copyright";


const theme = createTheme();
  
function ChangePasswordTwo() {

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const [newpassword, confirmpassword] =  [data.get('newpassword'), data.get('confirmpassword')];
        const result = await fetch('http://localhost:5000/api/changePasswordTwo', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              newpassword,
              confirmpassword
          })//
      }).then(res => res.json())
      if (result.status === 'ok') {
        navigate('../ ', {replace: true});
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
            Set New Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="Set new Password"
              name="newpassword"
              type="password"
              autoComplete="current-password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
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
              Change Password
            </Button>

            <Grid container>
              <Grid item>
                <Link href="#"
                 variant="body2"
                 onClick={() => /*setMode(prev => prev = 'signUp')*/ console.log('hello')}
                 >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="body2" align="center" color="text.secondary" component="p" style={{width: '35ch', margin: '0 auto'}}>
         use passKey to reset password , 
         passKey is Mother's name + your birth year
        </Typography>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )
}

export default ChangePasswordTwo;