
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameStatus, Balloon as BalloonType } from './types';
import { BALLOON_COLORS, GAME_DURATION_SECONDS, BALLOON_SPAWN_INTERVAL_MS } from './constants';
import Balloon from './components/Balloon';
import Scoreboard from './components/Scoreboard';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NotStarted);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<BalloonType[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);

  const gameTimerRef = useRef<number | null>(null);
  const balloonSpawnerRef = useRef<number | null>(null);
  const nextIdRef = useRef(0);

  const cleanupTimers = () => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (balloonSpawnerRef.current) clearInterval(balloonSpawnerRef.current);
  };

  const handleStartGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setBalloons([]);
    nextIdRef.current = 0;
    setGameStatus(GameStatus.Playing);
  };

  useEffect(() => {
    if (gameStatus === GameStatus.Playing) {
      gameTimerRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setGameStatus(GameStatus.GameOver);
            cleanupTimers();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      balloonSpawnerRef.current = window.setInterval(() => {
        const id = nextIdRef.current++;
        const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        const x = Math.random() * 90 + 5; // 5% to 95% of screen width
        const speed = Math.random() * 5 + 6; // 6 to 11 seconds
        const size = Math.random() * 40 + 60; // 60px to 100px
        
        const newBalloon: BalloonType = { id, color, x, speed, size };
        setBalloons(prev => [...prev, newBalloon]);
      }, BALLOON_SPAWN_INTERVAL_MS);
    }

    return cleanupTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  const handlePopBalloon = useCallback((id: number) => {
    setScore(prev => prev + 1);
    setBalloons(prev => prev.filter(b => b.id !== id));
  }, []);

  const handleBalloonMiss = useCallback((id: number) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
  }, []);
  
  const renderGameContent = () => {
    switch(gameStatus) {
      case GameStatus.NotStarted:
        return <StartScreen onStartGame={handleStartGame} />;
      case GameStatus.GameOver:
        return <GameOverScreen score={score} onRestartGame={handleStartGame} />;
      case GameStatus.Playing:
        return (
          <>
            <Scoreboard score={score} timeLeft={timeLeft} />
            {balloons.map(balloon => (
              <Balloon
                key={balloon.id}
                balloon={balloon}
                onPop={handlePopBalloon}
                onMiss={handleBalloonMiss}
              />
            ))}
          </>
        );
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-sky-400 to-sky-600 select-none">
      {renderGameContent()}
    </main>
  );
};

export default App;
