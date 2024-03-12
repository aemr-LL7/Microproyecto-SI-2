import { AppBar, Box, Toolbar, Container, Grid, Button, Typography, Stack, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../FireBase/config';
import { useNavigate } from 'react-router-dom';
import './navBar.css';
import SearchBar from './SearchBar';
import PrivateRoute from './PrivateNavbar';
import PrivateRoute2 from './PrivateNavBar2';
import { useAuth } from '../../Context/context';

export const NavBar: React.FC<object> = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Navigate function
  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout()
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleProfile = async () => {
    navigate('/profile')
  }

  // MENU DE CLUBES DEL USER

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='appBarr'>
        <Toolbar>
          <Container maxWidth="xl">
            <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Grid item>
                <Typography>
                  <Link to="/" className='title'>Videogames Club</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction={'row'} spacing={2}>
                  
                  <PrivateRoute>
                    {/* Mostrar botones de búsqueda, perfil y cerrar sesión si el usuario está autenticado */}
                    {/* <Button variant='contained'>Search</Button> */}
                    <Button
                      variant='contained'
                      onClick={handleMenuOpen} // Manejar la apertura del menú desplegable
                      endIcon={<ArrowDropDownIcon />} // Ícono de flecha hacia abajo
                    >
                      Mis Clubes
                    </Button>
                    <Menu
                      id="club-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {/* Aquí puedes mapear los clubes del usuario y crear elementos MenuItem */}
                      <MenuItem onClick={handleMenuClose}>Club 1</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Club 2</MenuItem>
                    </Menu>

                    <Button variant='contained' onClick={handleProfile} >Profile</Button>
                    <Button onClick={handleLogout} variant='contained' sx={{ color: "#ffffff", "&:hover": { backgroundColor: "#ffffff", color: "#ff0000", } }}>Log Out</Button>
                  </PrivateRoute>

                  <PrivateRoute2>
                    {/* Mostrar botón de inicio de sesión si el usuario no está autenticado */}
                    <Button variant='contained' onClick={handleLogin}>Login</Button >
                  </PrivateRoute2>

                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};