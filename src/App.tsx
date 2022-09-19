import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import socketClient from "socket.io-client";
const HomePage = React.lazy(() => import("./Pages/Home/Home.Page"));
const LobbyPage = React.lazy(() => import('./Pages/Lobby/Lobby.Page'));

function App() {

  useEffect(() => {
    connect()
  }, [])

  const connect = () => {
    const socket = socketClient("7.tcp.eu.ngrok.io:15473");
    console.log("socket", socket)
    socket.on("connect", () => {
      console.log("VEIKIAM")
    });
  }

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/lobby/:lobbyid' element={<LobbyPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
