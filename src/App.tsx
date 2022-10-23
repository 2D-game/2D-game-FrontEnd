import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import socketClient from "socket.io-client";
import { SocketContext } from "./Context";
import GamePage from "./Pages/Game/Game.Page";
import SocketSingleton from "./SocketSingleton";

const HomePage = React.lazy(() => import("./Pages/Home/Home.Page"));
const LobbyPage = React.lazy(() => import("./Pages/Lobby/Lobby.Page"));
const socket = socketClient("https://gameoop.herokuapp.com/");
// const socket = socketClient("127.0.0.1:3000/");

function App() {
  useEffect(() => {
    connect();
    var instance1 = SocketSingleton.getInstance() as any;
    instance1.setSocket(socket);
  }, []);

  const connect = () => {
    socket.on("connect", () => {});

    return () => {
      socket.off("connect");
    };
  };

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lobby/:lobbyid" element={<LobbyPage />} />
          <Route path="/game/:lobbyID" element={<GamePage />} />
        </Routes>
      </SocketContext.Provider>
    </Suspense>
  );
}

export default App;
