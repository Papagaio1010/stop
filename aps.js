import React from 'react';
import './theme.css';
import './styles.css';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import AppRouter from './AppRouter';
export default function App() {
    return (<div data-promptui-id="promptui-app-div-1" className="dark">
      <AuthProvider>
        <GameProvider>
          <AppRouter />
        </GameProvider>
      </AuthProvider>
    </div>);
}
