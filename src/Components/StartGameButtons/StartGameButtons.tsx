import { Box, Divider } from '@mui/material';
import React, { useState } from 'react';
import CreateButton from './CreateButton/CreateButton';
import JoinButton from './JoinButton/JoinButton';
import styles from './StartGameButtons.styling';


const StartGameButtons = () => {

    const [isJoinLobbyModalOpen, setIsJoinLobbyModalOpen] = useState<boolean>(false);

    return (
        <Box sx={styles.startButtonsContainer}>
            <JoinButton
                setIsJoinLobbyModalOpen={setIsJoinLobbyModalOpen}
                isJoinLobbyModalOpen={isJoinLobbyModalOpen}
            />
            <Divider />
            <CreateButton />

        </Box>
    )
}

export default StartGameButtons;