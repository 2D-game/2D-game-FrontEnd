import { Button } from '@mui/material';
import React from 'react';
import styles from './CreateButton.styling';

const CreateButton = () => {

    const createALobby = () => {

    }

    return (
        <Button
            onClick={createALobby}
            sx={styles.startButton}
        >
            Create a lobby
        </Button>
    )
}

export default CreateButton;