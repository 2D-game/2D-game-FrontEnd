import { Button } from '@mui/material';
import React, { useState } from 'react';
import styles from './CreateButton.styling';
import CreateButtonModal from './CreateButtonModal/CreateButtonModal';

const CreateButton = () => {

    const [isCreateLobbyModalOpen, setIsCreateLobbyModalOpen] = useState<boolean>(false);

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
            <CreateButtonModal
                isCreateLobbyModalOpen={isCreateLobbyModalOpen}
                setIsCreateLobbyModalOpen={setIsCreateLobbyModalOpen}
            />
        </>

    )
}

export default CreateButton;