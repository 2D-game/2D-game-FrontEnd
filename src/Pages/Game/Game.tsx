import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  StyledExtraText,
  StyledGame,
  StyledGamePage,
  StyledGround,
  StyledLoadingBlock,
  StyledLoadingSpinner,
  StyledLoadingText,
  StyledPlayer,
  StyledRow,
  StyledWall,
} from "./Game.style";
import { SocketContext } from "../../Context";
import { Socket } from "socket.io-client";
import { ClipLoader } from "react-spinners";
import { GameMap } from "../../types";
import { ReactComponent as IconPlayer } from "../../Assets/player.svg";

const Game: React.FC = () => {
  const [mapData, setMapData] = useState<GameMap>({
    map: {
      height: 0,
      width: 0,
      spawnPoint: { x: 0, y: 0 },
      objects: [[]],
    },
  });
  const [loading, setLoading] = useState<boolean>(true);

  const socket = useContext(SocketContext) as Socket;
  const { lobbyid } = useParams();

  useEffect(() => {
    socket.emit("set_ready");

    socket.on("start_game", (data) => {
      try {
        setMapData(data.data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const [mapMatrix, setMapMatrix] = useState([[""]]);

  const [players, setPlayers] = useState<
    [
      {
        id: string;
        username: string;
        coords: {
          x: number;
          y: number;
        };
      }
    ]
  >();

  useEffect(() => {
    socket.on("game_player_list", (data) => {
      let arr: typeof players = [
        { id: "", username: "", coords: { x: 0, y: 0 } },
      ];

      data.data.users.map(
        (
          value: {
            id: string;
            username: string;
            coords: { x: number; y: number };
          },
          index: number
        ) => {
          if (index == 0) {
            if (arr) {
              arr[0] = value;
            }
          } else {
            arr?.push(value);
          }
        }
      );

      setPlayers(arr);

      return () => {
        socket.off("game_player_list");
      };
    });
  }, [socket]);

  useEffect(() => {
    socket.on("move", (data) => {
      let tempPlayers = players;

      tempPlayers?.map((player) => {
        if (player.id == data.data.id) {
          player.coords.x = data.data.coords.x;
          player.coords.y = data.data.coords.y;
        }
      });

      setPlayers(tempPlayers);
    });
  }, [socket, players]);

  useEffect(() => {
    let tempMatrix = [[""]];

    mapData.map.objects.map((row) => {
      let rowArray = [""];

      row.map((cell) => {
        if (rowArray[0] == "") {
          rowArray[0] = cell;
        } else {
          rowArray.push(cell);
        }
      });

      if (tempMatrix[0][0] == "") {
        tempMatrix[0] = rowArray;
      } else {
        tempMatrix.push(rowArray);
      }
    });

    players?.map((player) => {
      tempMatrix[player.coords.x][player.coords.y] = "PLAYER";
    });

    setMapMatrix(tempMatrix);
  }, [mapData, players]);

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key == "a") {
        socket.emit("move", {
          direction: "LEFT",
        });
      }
      if (e.key == "s") {
        socket.emit("move", {
          direction: "DOWN",
        });
      }
      if (e.key == "d") {
        socket.emit("move", {
          direction: "RIGHT",
        });
      }
      if (e.key == "w") {
        socket.emit("move", {
          direction: "UP",
        });
      }
    });
  }, []);

  const [renderedGame, setRenderedGame] = useState<any>();

  useEffect(() => {
    const rows: any[] = [];

    mapMatrix.map((row) => {
      const objects: any[] = [];

      row.map((cell) => {
        cell == "WALL" && objects.push(<StyledWall />);
        cell == "NULL" && objects.push(<StyledGround />);
        cell == "PLAYER" &&
          objects.push(
            <StyledGround>
              <StyledPlayer>
                <IconPlayer />
              </StyledPlayer>
            </StyledGround>
          );
      });

      rows.push(<StyledRow>{objects}</StyledRow>);
    });

    setRenderedGame(rows);
  }, [mapMatrix]);

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
        <StyledGame>{renderedGame}</StyledGame>
      )}
    </StyledGamePage>
  );
};

export default Game;
