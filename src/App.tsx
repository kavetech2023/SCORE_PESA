import React, { useState, useCallback } from 'react';
import { GameField } from './components/GameField';
import { ScoreBoard } from './components/ScoreBoard';
import { SplashScreen } from './components/SplashScreen';
import { MainMenu } from './components/MainMenu';
import { PauseMenu } from './components/PauseMenu';
import { GameState, GameSettings } from './types/game';

function App() {
  const [gameState, setGameState] = useState<GameState>('splash');
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    difficulty: 'medium',
    playerMode: 'single'
  });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const handleScore = (playerId: number) => {
    setScores(prev => ({
      ...prev,
      [playerId === 0 ? 'player1' : 'player2']: prev[playerId === 0 ? 'player1' : 'player2'] + 1
    }));
  };

  const handleSplashComplete = () => {
    setGameState('menu');
  };

  const handleStartGame = () => {
    setGameState('playing');
    setScores({ player1: 0, player2: 0 });
  };

  const handlePause = () => {
    setGameState('paused');
  };

  const handleResume = () => {
    setGameState('playing');
  };

  const handleMainMenu = () => {
    setGameState('menu');
    setScores({ player1: 0, player2: 0 });
  };

  const handleRestart = () => {
    setScores({ player1: 0, player2: 0 });
    setGameState('playing');
  };

  if (gameState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (gameState === 'menu') {
    return (
      <MainMenu
        onStart={handleStartGame}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center overflow-hidden">
      <div className="mb-4">
        <ScoreBoard
          player1Score={scores.player1}
          player2Score={scores.player2}
          onPause={handlePause}
        />
      </div>
      <div className="relative h-full aspect-[5/8] max-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        <GameField onScore={handleScore} settings={settings} />
        {gameState === 'paused' && (
          <PauseMenu
            onResume={handleResume}
            onRestart={handleRestart}
            onMainMenu={handleMainMenu}
          />
        )}
      </div>
    </div>
  );
}

export default App;