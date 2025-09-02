import React from 'react';

interface ScoreboardProps {
    score: number;
    timeLeft: number;
    lives: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, timeLeft, lives }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 text-white z-10 flex justify-between items-center gap-2 sm:gap-4">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 flex-1 text-center">
                <span className="text-sm sm:text-lg font-semibold tracking-wider block sm:inline">SCORE</span>
                <span className="ml-0 sm:ml-3 text-xl sm:text-3xl font-black">{score}</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 flex-1 text-center">
                <span className="text-sm sm:text-lg font-semibold tracking-wider block sm:inline">LIVES</span>
                <div className="ml-0 sm:ml-3 text-xl sm:text-3xl font-black inline-block">
                    {Array.from({ length: lives }).map((_, i) => (
                        <span key={i} role="img" aria-label="life" className="drop-shadow-md">❤️</span>
                    ))}
                </div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 flex-1 text-center">
                <span className="text-sm sm:text-lg font-semibold tracking-wider block sm:inline">TIME</span>
                <span className="ml-0 sm:ml-3 text-xl sm:text-3xl font-black">{formatTime(timeLeft)}</span>
            </div>
        </div>
    );
};

export default Scoreboard;