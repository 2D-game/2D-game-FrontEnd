import { Modal, Box, InputLabel, Input, InputAdornment, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../../Context';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import styles from './CreateButtonModal.styling';

interface ICreateButtonModalProps {
    isCreateLobbyModalOpen: boolean;
    setIsCreateLobbyModalOpen: (bool: boolean) => void;
};

const CreateButtonModal = ({ isCreateLobbyModalOpen, setIsCreateLobbyModalOpen }: ICreateButtonModalProps) => {

    const socket = useContext(SocketContext) as Socket;
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>("");
    const [isLobbyCreated, setIsLobbyCreated] = useState({
        isCreated: false,
        ID: -1
    });

    useEffect(() => {
        socket.on('create_lobby', data => {
            console.log("data: ", data)
            if (!isLobbyCreated.isCreated) {
                setIsLobbyCreated({ isCreated: true, ID: data.data.id })
                navigate(`/lobby/${data.data.id}`);
            }

        })

        return () => {
            socket.off('create_lobby');
        };
    }, [socket])


    const handleModalClose = () => {
        setIsCreateLobbyModalOpen(false);
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("username: ", e.target.value);

        setUserName(e.target.value);
    };

    const handleCreateNewLobbyButtonClick = () => {
        socket.emit('create_lobby',
            { username: userName }
        );
        console.log("to create lobby");
    };

    return (
        <Modal
            open={isCreateLobbyModalOpen}
            onClose={handleModalClose}
        >
            <Box sx={styles.createLobbyModalContainer}>
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
                    onChange={handleUserNameChange}
                />
                <br />
                <Button
                    variant='outlined'
                    sx={{ marginTop: 3 }}
                    onClick={handleCreateNewLobbyButtonClick}
                >
                    Create
                </Button>
            </Box>
        </Modal>
    )
}

export default CreateButtonModal;