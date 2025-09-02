import React from 'react';

interface StartScreenProps {
    onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-4" style={{textShadow: '0 4px 10px rgba(0,0,0,0.3)'}}>
                Balloon Pop
            </h1>
            <p className="text-lg sm:text-xl max-w-md mb-2 opacity-90">
                Pop the <span className="text-red-300 font-bold">red</span> balloons to score points.
            </p>
            <p className="text-lg sm:text-xl max-w-md mb-8 opacity-90">
                Avoid the <span className="font-bold">white</span> ones, or you'll lose a life!
            </p>
            <button
                onClick={onStartGame}
                className="bg-white text-sky-600 font-bold text-2xl px-12 py-4 rounded-full shadow-2xl transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
                Start Game
            </button>
        </div>
    );
};

export default StartScreen;