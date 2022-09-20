import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import socketClient from "socket.io-client";
import { SocketContext } from './Context';

const HomePage = React.lazy(() => import("./Pages/Home/Home.Page"));
const LobbyPage = React.lazy(() => import('./Pages/Lobby/Lobby.Page'));
const socket = socketClient("https://gameoop.herokuapp.com/");

function App() {

  useEffect(() => {
    connect()
  }, [])

  const connect = () => {

    socket.on("connect", () => {
      console.log("VEIKIAM")
    });

    return () => {
      socket.off('connect');
    };
  }

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/lobby/:lobbyid' element={<LobbyPage />} />
        </Routes>
      </SocketContext.Provider>

    </Suspense>
  );
}

export default App;
