import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
} from "@mui/material";
import styles from "./JoinButtonModal.styling";
import { SocketContext } from "../../../../Context";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../../../helpers/currentUser";
import { DisplayUsernameInputs } from '../../PatternVisitor/DisplayUsernameInputs';
import { DisplayEnterLobbyCodeInputs } from '../../PatternVisitor/DisplayEnterLobbyCodeInputs';
import { JoinModalVisitor } from "../../PatternVisitor/JoinModalVisitor";
import { Visitor } from "../../PatternVisitor/Interfaces";
import { JoinAuthentication } from "../../PatternMediator/JoinAuthentication";
import { ConcreteMediator } from "../../PatternMediator/ConcreteMediator";

interface IJoinButtonModalProps {
  isJoinLobbyModalOpen: boolean;
  setIsJoinLobbyModalOpen: (bool: boolean) => void;
}

const JoinButtonModal = ({ isJoinLobbyModalOpen, setIsJoinLobbyModalOpen }: IJoinButtonModalProps) => {
  const socket = useContext(SocketContext) as Socket;
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [lobbyID, setLobbyID] = useState<string>("");
  const joinModalVisitor = new JoinModalVisitor();


  useEffect(() => {
    socket.on("join_lobby", (data) => {
      if (!data.error) {
        navigate(`/lobby/${data.data.id}`);
      }
    });

    return () => {
      socket.off("join_lobby");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const clientCode = (visitor: Visitor) => {
    const components = [
      new DisplayUsernameInputs(userName, handleUserNameChange),
      new DisplayEnterLobbyCodeInputs(lobbyID, handleLobbyIDChange)
    ]

    let temp: JSX.Element[] = []
    for (const component of components) {
      temp.push(component.accept(visitor));
    }
    return temp
  }

  const handleModalClose = () => {
    setIsJoinLobbyModalOpen(false);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleLobbyIDChange = (e: any) => {
    let lobbyID: string = e.target.value as string;
    const joinAuth = new JoinAuthentication({ userName, lobbyID });
    new ConcreteMediator(joinAuth);
    const validation: boolean = joinAuth.checkIfLobbyIDIsWrittenCorrectly();

    if (validation) return;

    setLobbyID(e.target.value);
  };

  const handleJoinButtonClick = () => {
    const joinAuth = new JoinAuthentication({ userName, lobbyID });
    new ConcreteMediator(joinAuth);
    const validation: boolean = joinAuth.checkIfTextBoxNotClear();

    if (validation) return;
    socket.emit("join_lobby", {
      username: userName,
      id: lobbyID,
    });
    CurrentUser.userName = userName;
  };

  return (
    <>
      <Modal open={isJoinLobbyModalOpen} onClose={handleModalClose}>
        <Box sx={styles.joinLobbyModalContainer}>
          {clientCode(joinModalVisitor)}
          <br />
          <Button
            variant="outlined"
            sx={{ marginTop: 3 }}
            onClick={handleJoinButtonClick}
          >
            Join
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default JoinButtonModal;
