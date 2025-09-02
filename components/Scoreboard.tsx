
import React from 'react';

interface ScoreboardProps {
    score: number;
    timeLeft: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, timeLeft }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 text-white z-10 flex justify-between items-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm sm:text-lg font-semibold tracking-wider">SCORE</span>
                <span className="ml-3 text-xl sm:text-3xl font-black">{score}</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm sm:text-lg font-semibold tracking-wider">TIME</span>
                <span className="ml-3 text-xl sm:text-3xl font-black">{formatTime(timeLeft)}</span>
            </div>
        </div>
    );
};

export default Scoreboard;
