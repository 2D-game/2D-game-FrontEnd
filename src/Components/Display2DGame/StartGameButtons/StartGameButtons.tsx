import { Box, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import JoinButtonModal from './JoinButtonModal/JoinButtonModal';
import styles from './StartGameButtons.styling';


const StartGameButtons = () => {

    const [isJoinLobbyModalOpen, setIsJoinLobbyModalOpen] = useState<boolean>(false);

    const openJoinLobbyModal = () => {

        setIsJoinLobbyModalOpen(true);
    };

    const createALobby = () => {

    }

    return (
        <Box sx={styles.startButtonsContainer}>
            <Button
                onClick={openJoinLobbyModal}
                sx={styles.startButton}
            >
                Join the lobby
            </Button>
            <Divider />
            <Button
                onClick={createALobby}
                sx={styles.startButton}
            >
                Create a lobby
            </Button>
            <JoinButtonModal
                isJoinLobbyModalOpen={isJoinLobbyModalOpen}
                setIsJoinLobbyModalOpen={setIsJoinLobbyModalOpen}
            />
        </Box>
    )
}

export default StartGameButtons;