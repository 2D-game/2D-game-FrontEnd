import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import("./Pages/Home/Home.Page"));
const LobbyPage = React.lazy(() => import('./Pages/Lobby/Lobby.Page'));

function App() {
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
