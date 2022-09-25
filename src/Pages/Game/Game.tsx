import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  StyledExtraText,
  StyledGamePage,
  StyledGround,
  StyledLoadingBlock,
  StyledLoadingSpinner,
  StyledLoadingText,
  StyledGame,
  StyledRow,
  StyledWall,
  StyledPlayer,
} from "./Game.style";
import { SocketContext } from "../../Context";
import { Socket } from "socket.io-client";
import { ClipLoader } from "react-spinners";
import { GameMap } from "../../types";
import { ReactComponent as IconPlayer } from "../../Assets/player.svg";

const Game: React.FC = () => {
  const [gameData, setGameData] = useState<GameMap>({
    map: { height: 0, objects: [[]], spawnPoint: { x: 0, y: 0 }, width: 0 },
  });
  const [loading, setLoading] = useState<boolean>(true);

  const socket = useContext(SocketContext) as Socket;
  const { lobbyid } = useParams();

  useEffect(() => {
    socket.emit("set_ready");

    socket.on("start_game", (data) => {
      try {
        setGameData(data.data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const renderGame = () => {
    const rows = [];

    for (let currHeigth = 0; currHeigth < gameData.map.height; currHeigth++) {
      const objects = [];

      for (let currWidth = 0; currWidth < gameData.map.width; currWidth++) {
        if (
          gameData.map.spawnPoint.x == currHeigth &&
          gameData.map.spawnPoint.y == currWidth
        ) {
          objects.push(
            <StyledGround>
              <StyledPlayer>
                <IconPlayer />
              </StyledPlayer>
            </StyledGround>
          );
        } else if (currHeigth == 0) {
          objects.push(<StyledWall />);
        } else if (currHeigth == gameData.map.height - 1) {
          objects.push(<StyledWall />);
        } else {
          if (currWidth == 0) {
            objects.push(<StyledWall />);
          } else if (currWidth == gameData.map.width - 1) {
            objects.push(<StyledWall />);
          } else {
            objects.push(<StyledGround />);
          }
        }
      }
      rows.push(<StyledRow>{objects}</StyledRow>);
    }
    return rows;
  };

  return (
    <StyledGamePage>
      {loading ? (
        <StyledLoadingBlock>
          <StyledLoadingText>Lobby ID: {lobbyid}</StyledLoadingText>

          <StyledExtraText>
            Waiting for all players to be ready...
          </StyledExtraText>

          <StyledLoadingSpinner>
            <ClipLoader loading={loading} size={100} />
          </StyledLoadingSpinner>
        </StyledLoadingBlock>
      ) : (
        <StyledGame>{renderGame()}</StyledGame>
      )}
    </StyledGamePage>
  );
};

export default Game;
