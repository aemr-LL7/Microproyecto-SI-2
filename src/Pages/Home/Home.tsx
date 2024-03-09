import React from 'react'
import { Button, Container } from '@mui/material';
import {NavBar} from '../NavBar/navBar';
export const Home: React.FC<object> = () => {
    return (
        <div>
            <NavBar/>
            <h1>Nos encontramos en HOME</h1>
            <Container sx={{ mt: 9 }} maxWidth="xl">
                <Button fullWidth variant='contained'>
                    Hola brav d'accord
                </Button>
            </Container>
        </div>

    )
}
