import { AppBar, Box, Toolbar, Container, Grid, Button, Typography, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../FireBase/config';
import { useNavigate } from 'react-router-dom';
import './navBar.css';
import SearchBar from './SearchBar';

export const NavBar: React.FC<object> = () => {
    const navigate = useNavigate(); // Navigate function

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error("Error logging out:", error);
        }
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
                                    {/* <SearchBar />  Agrega el componente SearchBar */}
                                    <Button variant='contained'>Profile</Button>
                                    <Button onClick={handleLogout} variant='contained' sx={{ color: "#ffffff", "&:hover": { backgroundColor: "#ffffff", color: "#ff0000", } }}>Log Out</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};