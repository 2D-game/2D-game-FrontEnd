import { Button } from '@mui/material';
import React from 'react';
import styles from './CreateButton.styling';

interface ICreateButtonProps {
    setIsCreateLobbyModalOpen: (bool: boolean) => void;
    isCreateLobbyModalOpen: boolean;
}

const CreateButton = ({ isCreateLobbyModalOpen, setIsCreateLobbyModalOpen }: ICreateButtonProps) => {

    const createALobby = () => {
        setIsCreateLobbyModalOpen(true);
    };

    return (
        <>
            <Button
                onClick={createALobby}
                sx={styles.startButton}
            >
                Create a lobby
            </Button>
        </>

    )
}

export default CreateButton;