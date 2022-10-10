import { Button } from '@mui/material';
import React from 'react';
import styles from './JoinButton.styling';

interface IJoinButtonProps {
    setIsJoinLobbyModalOpen: (bool: boolean) => void;
    isJoinLobbyModalOpen: boolean;
}

const JoinButton = ({ setIsJoinLobbyModalOpen, isJoinLobbyModalOpen }: IJoinButtonProps) => {

    const openJoinLobbyModal = () => {

        setIsJoinLobbyModalOpen(true);
    };

    return (
        <>
            <Button
                onClick={openJoinLobbyModal}
                sx={styles.startButton}
            >
                Join the lobby
            </Button>
            
        </>

    )
}

export default JoinButton;