import React from 'react'
import { Button, Container } from '@mui/material';

export const Home: React.FC<object> = () => {
    return (
        <div>Nos encontramos en HOME
            <Container sx={{ mt: 9 }} maxWidth="xl">
                <Button fullWidth variant='contained'>
                    Hola brav d'accord
                </Button>
            </Container>
        </div>

    )
}
