import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const DisplayLobby = () => {

    let { lobbyid } = useParams();

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2, justifyContent: "center" }}>
                <Box>
                    Lobby ID:
                </Box>
                <Box sx={{ fontWeight: 600, marginLeft: 1 }}>
                    {lobbyid}
                </Box>
            </Box>

            <Box sx={{ marginTop: 2, textAlign: "center" }}>
                <Typography>
                    Joined Users In Lobby:
                </Typography>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: 1 }}>
                <Button>
                    Ready To Start
                </Button>
            </Box>

        </Box >

    )
}

export default DisplayLobby;