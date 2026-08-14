import React from 'react';
import { useGame } from './context/GameContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import RoomSetup from './pages/RoomSetup';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Validation from './pages/Validation';
import Results from './pages/Results';

export function AppRouter() {
  const { screen } = useGame();

  switch (screen) {
    case 'dashboard':
      return <Dashboard />;
    case 'setup':
      return <RoomSetup />;
    case 'lobby':
      return <Lobby />;
    case 'game':
      return <Game />;
    case 'validation':
      return <Validation />;
    case 'results':
      return <Results />;
    case 'landing':
    default:
      return <Landing />;
  }
}

export default AppRouter;
