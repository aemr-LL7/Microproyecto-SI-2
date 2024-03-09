import { AppBar, Box, Toolbar, Container, Grid, Button, Typography, Stack } from '@mui/material';
import React from 'react';

export const GeneralNavBar: React.FC<object> = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'>
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Grid item>
                                <Typography>Videogames Club</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction={'row'} spacing={2}>
                                    <Button variant='contained'>Search</Button>
                                    <Button variant='contained'>Profile</Button>
                                    <Button variant='contained'>Groups</Button>

                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};