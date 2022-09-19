import React from 'react';
import { Box, Button, Input, InputAdornment, InputLabel, Modal } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import styles from './JoinButtonModal.styling';

interface IJoinButtonModalProps {
    isJoinLobbyModalOpen: boolean;
    setIsJoinLobbyModalOpen: (bool: boolean) => void;
}

const JoinButtonModal = ({ isJoinLobbyModalOpen, setIsJoinLobbyModalOpen }: IJoinButtonModalProps) => {

    const handleModalClose = () => {

        setIsJoinLobbyModalOpen(false);
    };

    return (
        <>
            <Modal
                open={isJoinLobbyModalOpen}
                onClose={handleModalClose}
            >
                <Box sx={styles.joinLobbyModalContainer}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Your Username:
                    </InputLabel>
                    <Input
                        sx={{ marginBottom: 1 }}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        }
                    />
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Enter lobby code:
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <MeetingRoomIcon />
                            </InputAdornment>
                        }
                    />
                    <br />
                    <Button
                        variant='outlined'
                        sx={{ marginTop: 3 }}
                    >
                        Join
                    </Button>
                </Box>

            </Modal>
        </>

    )
}

export default JoinButtonModal;