import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../../Context';

const DisplayLobby = () => {

    const [playersList, setPlayersList] = useState<[]>([])
    const socket = useContext(SocketContext) as Socket;
    let { lobbyid } = useParams();

    useEffect(() => {
        socket.emit('player_list')
    }, [])

    useEffect(() => {
        socket.on('player_list', data => {
            console.log("playerlistdata", data)
            setPlayersList(data.data.usernames)
        })

        return () => {
            socket.off('player_list');
        };
    }, [socket])

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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>User name:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playersList.map((player) => (
                            <TableRow
                                key={player}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {player}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ textAlign: "center", marginTop: 1 }}>
                <Button>
                    Ready To Start
                </Button>
            </Box>

        </Box >

    )
}

export default DisplayLobby;