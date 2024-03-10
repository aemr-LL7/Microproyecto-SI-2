import React, { useEffect, useState } from 'react';
import {DocumentData, onSnapshot, QuerySnapshot} from 'firebase/firestore';
import { Container } from '@mui/material';
import { NavBar } from '../NavBar/navBar';
import { clubsCollection } from "../../FireBase/config";

export const Home: React.FC<object> = () => {
    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        onSnapshot(clubsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
            setClubs(snapshot.docs.map((doc)=>{
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            }));
        });
    }, []);

    console.log(clubs, 'clubs');

    return (
        <div>
            <NavBar />
            <h1>Nos encontramos en HOME</h1>
            <Container sx={{ mt: 9 }} maxWidth="xl">
                <div className='card'>
                    <h2 className='title'> Clubes disponibles</h2>
                </div>
            </Container>
        </div>

    )
}
