import { Box, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const DisplayLobby = () => {

    let { lobbyid } = useParams();

    return (
        <Box>
            <Typography>{lobbyid}</Typography>
        </Box>
    )
}

export default DisplayLobby;