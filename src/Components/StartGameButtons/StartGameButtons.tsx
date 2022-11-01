import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateButton from "./CreateButton/CreateButton";
import JoinButton from "./JoinButton/JoinButton";
import JoinButtonModal from "./JoinButton/JoinButtonModal/JoinButtonModal";
import styles from "./StartGameButtons.styling";
import CreateButtonModal from "./CreateButton/CreateButtonModal/CreateButtonModal";
import { ButtonModalStrategy } from "./ButtonModalStrategy";

let buttonModalStrategy = new ButtonModalStrategy();
const StartGameButtons = () => {
  const [isJoinLobbyModalOpen, setIsJoinLobbyModalOpen] =
    useState<boolean>(false);
  const [isCreateLobbyModalOpen, setIsCreateLobbyModalOpen] =
    useState<boolean>(false);
  const [rerender, setrerender] = useState(false);

  useEffect(() => {
    if (isJoinLobbyModalOpen) {
      buttonModalStrategy.setModal(
        <JoinButtonModal
          isJoinLobbyModalOpen={isJoinLobbyModalOpen}
          setIsJoinLobbyModalOpen={setIsJoinLobbyModalOpen}
        />
      );
      setrerender(!rerender);
    } else if (isCreateLobbyModalOpen) {
      buttonModalStrategy.setModal(
        <CreateButtonModal
          isCreateLobbyModalOpen={isCreateLobbyModalOpen}
          setIsCreateLobbyModalOpen={setIsCreateLobbyModalOpen}
        />
      );
      setrerender(!rerender);
    } else {
      buttonModalStrategy.setModal(<></>);
      setrerender(!rerender);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isJoinLobbyModalOpen, isCreateLobbyModalOpen]);

  return (
    <Box sx={styles.startButtonsContainer}>
      <JoinButton
        setIsJoinLobbyModalOpen={setIsJoinLobbyModalOpen}
        isJoinLobbyModalOpen={isJoinLobbyModalOpen}
      />
      <Divider />
      <CreateButton
        isCreateLobbyModalOpen={isCreateLobbyModalOpen}
        setIsCreateLobbyModalOpen={setIsCreateLobbyModalOpen}
      />
      {buttonModalStrategy.displayModal()}
    </Box>
  );
};

export default StartGameButtons;
