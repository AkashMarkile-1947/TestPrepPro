import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import '../Pages/Styles/userBoard.css';
import { useNavigate } from 'react-router-dom';
import './Components.css';

function Navbar() {
  const navigate = useNavigate();
  const userID =  localStorage.getItem('resultemail');
  const isAdmin = localStorage.getItem("isAdmin");
  function logout() {
    navigate('../', {replace: true});
    localStorage.removeItem("resultemail");
    localStorage.removeItem("isAdmin");
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="header" style={{width: '100vw'}}>
      <AppBar position="static" color="info">
        <Toolbar>
          {/*<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
  </IconButton>*/}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('../', {replace: true})} style={{cursor: 'pointer'}}>
            TestPrepPro 
          </Typography>
          {userID && <div className="profile-icon">{userID.slice(0, 2).toUpperCase()}</div>}
          {userID && <Button color='inherit' variant="outlined" onClick={logout}>Logout <sup style={{fontSize: '0.55rem', position: 'relative', bottom: '5px'}}>{isAdmin && "Admin"}</sup></Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

