
import React from 'react';

interface GameOverScreenProps {
    score: number;
    onRestartGame: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestartGame }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white text-center p-4 bg-black/20">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-2" style={{textShadow: '0 4px 10px rgba(0,0,0,0.3)'}}>
                Game Over!
            </h2>
            <p className="text-lg sm:text-xl mb-4 opacity-90">Your final score is</p>
            <p className="text-7xl sm:text-9xl font-black mb-8 text-yellow-300" style={{textShadow: '0 5px 15px rgba(253, 224, 71, 0.4)'}}>
                {score}
            </p>
            <button
                onClick={onRestartGame}
                className="bg-white text-sky-600 font-bold text-2xl px-12 py-4 rounded-full shadow-2xl transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
                Play Again
            </button>
        </div>
    );
};

export default GameOverScreen;
