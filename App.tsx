import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameStatus, Balloon as BalloonType } from './types';
import { GAME_DURATION_SECONDS, BALLOON_SPAWN_INTERVAL_MS, INITIAL_LIVES, GOOD_BALLOON_COLOR, BAD_BALLOON_COLOR, BAD_BALLOON_CHANCE } from './constants';
import Balloon from './components/Balloon';
import Scoreboard from './components/Scoreboard';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NotStarted);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [balloons, setBalloons] = useState<BalloonType[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);

  const gameTimerRef = useRef<number | null>(null);
  const balloonSpawnerRef = useRef<number | null>(null);
  const nextIdRef = useRef(0);

  const cleanupTimers = useCallback(() => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (balloonSpawnerRef.current) clearInterval(balloonSpawnerRef.current);
    gameTimerRef.current = null;
    balloonSpawnerRef.current = null;
  }, []);

  const handleStartGame = () => {
    setScore(0);
    setLives(INITIAL_LIVES);
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
        const isBad = Math.random() < BAD_BALLOON_CHANCE;
        const type = isBad ? 'bad' : 'good';
        const color = isBad ? BAD_BALLOON_COLOR : GOOD_BALLOON_COLOR;
        const x = Math.random() * 90 + 5; // 5% to 95% of screen width
        const speed = Math.random() * 5 + 6; // 6 to 11 seconds
        const size = Math.random() * 40 + 60; // 60px to 100px
        
        const newBalloon: BalloonType = { id, color, x, speed, size, type };
        setBalloons(prev => [...prev, newBalloon]);
      }, BALLOON_SPAWN_INTERVAL_MS);
    } else {
      cleanupTimers();
    }

    return cleanupTimers;
  }, [gameStatus, cleanupTimers]);

  useEffect(() => {
    if (lives <= 0 && gameStatus === GameStatus.Playing) {
      setGameStatus(GameStatus.GameOver);
    }
  }, [lives, gameStatus]);

  const handlePopBalloon = useCallback((id: number) => {
    setBalloons(prevBalloons => {
        const poppedBalloon = prevBalloons.find(b => b.id === id);
        if (poppedBalloon) {
            if (poppedBalloon.type === 'good') {
                setScore(prevScore => prevScore + 1);
            } else {
                setLives(prevLives => Math.max(0, prevLives - 1));
            }
        }
        return prevBalloons.filter(b => b.id !== id);
    });
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
            <Scoreboard score={score} timeLeft={timeLeft} lives={lives} />
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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] -left-[10%] w-72 h-36 sm:w-96 sm:h-48 bg-white rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute top-[20%] -right-[15%] w-80 h-40 sm:w-[30rem] sm:h-60 bg-white rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute bottom-[25%] left-[10%] w-64 h-32 sm:w-80 sm:h-40 bg-white rounded-full opacity-25 blur-2xl"></div>
        <div className="absolute bottom-[15%] -right-[10%] w-72 h-36 sm:w-96 sm:h-48 bg-white rounded-full opacity-20 blur-xl"></div>
      </div>
      {renderGameContent()}
    </main>
  );
};

export default App;