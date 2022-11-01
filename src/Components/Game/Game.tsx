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
  StyledWonText,
} from "./Game.style";
import { ClipLoader } from "react-spinners";
import { CurrentUser } from "../../helpers/currentUser";
import { Colors, GamePlayer } from "../../types";
import { Adapter, Logger } from "./Adapter";

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

type WonData = {
  username: string;
};

const keyToDirection: Map<string, string> = new Map([
  ["w", "UP"],
  ["a", "LEFT"],
  ["s", "DOWN"],
  ["d", "RIGHT"],
  ["b", "UNDO"],
]);

const Game = (props: { lobbyID: any }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [matrix, setMatrix] = useState<Object[][] | null>(null);
  const [colors, setColors] = useState<Colors>({
    lava: "",
    wall: "",
    water: "",
  });
  const [won, setWon] = useState<WonData | null>(null);

  const socket = useContext(SocketContext) as Socket;

  const onMove = useCallback(
    (data: any) => {
      if (!players) {
        return;
      }

      if (data.data?.won) {
        setWon({ username: data.data.userName });
        return;
      }

      if (data.data.map && data.data.userName === CurrentUser.userName) {
        setGameData({ map: data.data.map });
        CurrentUser.currentLevel = data.data.level;
        setColors(data.data.colors);
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
      setColors(data.data.colors);
    });

    socket.on("game_player_list", (data) => {
      setPlayers(data.data.users);
      data.data.users.forEach((user: GamePlayer) => {
        if (CurrentUser.userName === user.username) CurrentUser.id = user.id;
        CurrentUser.currentLevel = user.level;
      });
    });

    socket.on("move", onMove);
    socket.on("force_next_level", onMove);

    return () => {
      socket.off("start_game");
      socket.off("game_player_list");
      socket.off("move");
      socket.off("force_next_level");
    };
  }, [socket, onMove]);

  const forceNextLevel = useCallback(() => {
    socket.emit("force_next_level");
  }, [socket]);

  useEffect(() => {
    if (!gameData || !players) {
      return;
    }

    const matrix = gameData.map.objects.map((row) => {
      return row.map((obj) => obj);
    });

    players.forEach((player) => {
      if (player.level === CurrentUser.currentLevel) {
        matrix[player.coords.y][player.coords.x] = Object.PLAYER;
      }
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

  useEffect(() => {
    const adapter = new Adapter(colors);
    const convertedObject = adapter.getString();
    const logger = new Logger();
    convertedObject.length && logger.logString(convertedObject);
  }, [colors]);

  if (loading) {
    return (
      <StyledLoadingBlock>
        <StyledLoadingText>Lobby ID: {props.lobbyID}</StyledLoadingText>

        <StyledExtraText>
          Waiting for all players to be ready...
        </StyledExtraText>

        <StyledLoadingSpinner>
          <ClipLoader loading={loading} size={100} />
        </StyledLoadingSpinner>
      </StyledLoadingBlock>
    );
  } else if (won) {
    return (
      <StyledLoadingBlock>
        <StyledWonText>Player {won.username} won the game!</StyledWonText>
      </StyledLoadingBlock>
    );
  }

  return (
    <>
      <StyledGame>
        {matrix &&
          colors &&
          matrix.map((row, y) => (
            <Row key={y} row={row} y={y} colors={colors} />
          ))}
      </StyledGame>
      <div>
        <button onClick={forceNextLevel}>Force next level</button>
      </div>
    </>
  );
};

export default Game;
