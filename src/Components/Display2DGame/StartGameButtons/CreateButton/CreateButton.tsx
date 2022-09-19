import { Button } from '@mui/material';
import React from 'react';
import styles from './CreateButton.styling';
import { useNavigate } from 'react-router-dom';

const CreateButton = () => {

    const navigate = useNavigate();

    const createALobby = () => {
        let generateRandomLobbyID = (Math.random() + 1).toString().substring(12);
        navigate(`/lobby/${generateRandomLobbyID}`);
    };

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