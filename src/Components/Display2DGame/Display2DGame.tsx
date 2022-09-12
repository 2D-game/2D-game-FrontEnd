import { Container } from '@mui/material';
import React from 'react';
import styles from './Display2DGame.styling';
import StartGameButtons from './StartGameButtons/StartGameButtons';


const Display2DGame = () => {

    return (
        <Container fixed sx={styles.rootContainer}>
            <StartGameButtons />
        </Container>
    )
}

export default Display2DGame;