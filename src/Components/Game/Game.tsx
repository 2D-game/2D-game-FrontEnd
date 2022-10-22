import { useCallback, useContext, useEffect, useState } from "react";
import { Object } from "./Object";
import Row from "./Row/Row";
import { SocketContext } from "../../Context";
import { Socket } from "socket.io-client";
import {
  StyledExtraText,
  StyledGame,
  StyledLoadingBlock,
  StyledLoadingSpinner,
  StyledLoadingText,
} from "./Game.style";
import { ClipLoader } from "react-spinners";
import { User } from "../../helpers/user";

type Coordinates = {
  x: number;
  y: number;
};

type Player = {
  id: string;
  level: number;
  coords: Coordinates;
};

type GameData = {
  map: {
    height: number;
    width: number;
    spawnPoint: Coordinates;
    objects: Object[][];
  };
};

const keyToDirection: Map<string, string> = new Map([
  ["w", "UP"],
  ["a", "LEFT"],
  ["s", "DOWN"],
  ["d", "RIGHT"],
]);

const Game = (props: { lobbyID: any }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [matrix, setMatrix] = useState<Object[][] | null>(null);
  const userName = User.userName;

  const socket = useContext(SocketContext) as Socket;

  const onMove = useCallback(
    (data: any) => {
      if (!players) {
        return;
      }

      if (data.data.map && data.data.userName == userName) {
        setGameData({ map: data.data.map });
      }

      const newPlayers = players.map((player) => {
        if (player.id === data.data.id) {
          return {
            id: data.data.id,
            level: data.data.level,
            coords: data.data.coords,
          };
        }
        return player;
      });

      setPlayers(newPlayers);
    },
    [players]
  );

  useEffect(() => {
    socket.on("start_game", (data) => {
      setGameData(data.data);
    });

    socket.on("game_player_list", (data) => {
      setPlayers(data.data.users);
    });

    socket.on("move", onMove);

    return () => {
      socket.off("start_game");
      socket.off("game_player_list");
      socket.off("move");
    };
  }, [socket, onMove]);

  useEffect(() => {
    if (!gameData || !players) {
      return;
    }

    const matrix = gameData.map.objects.map((row) => {
      return row.map((obj) => obj);
    });

    players.forEach((player) => {
      matrix[player.coords.y][player.coords.x] = Object.PLAYER;
    });

    setMatrix(matrix);
    setLoading(false);
  }, [gameData, players]);

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      const direction = keyToDirection.get(e.key);
      if (direction) {
        socket.emit("move", { direction });
      }
    });

    return () => {
      window.removeEventListener("keypress", () => {});
    };
  }, [socket]);

  return (
    <>
      {loading ? (
        <StyledLoadingBlock>
          <StyledLoadingText>Lobby ID: {props.lobbyID}</StyledLoadingText>

          <StyledExtraText>
            Waiting for all players to be ready...
          </StyledExtraText>

          <StyledLoadingSpinner>
            <ClipLoader loading={loading} size={100} />
          </StyledLoadingSpinner>
        </StyledLoadingBlock>
      ) : (
        <StyledGame>
          {matrix && matrix.map((row, y) => <Row key={y} row={row} y={y} />)}
        </StyledGame>
      )}
    </>
  );
};

export default Game;
