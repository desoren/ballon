
import React, { useEffect, memo } from 'react';
import type { Balloon as BalloonType } from '../types';

interface BalloonProps {
  balloon: BalloonType;
  onPop: (id: number) => void;
  onMiss: (id: number) => void;
}

const Balloon: React.FC<BalloonProps> = ({ balloon, onPop, onMiss }) => {
  useEffect(() => {
    const missTimer = setTimeout(() => {
      onMiss(balloon.id);
    }, balloon.speed * 1000);

    return () => clearTimeout(missTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePop = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onPop(balloon.id);
  }

  return (
    <div
      className="absolute bottom-[-150px] cursor-pointer"
      style={{
        left: `${balloon.x}%`,
        animation: `floatUp ${balloon.speed}s forwards`,
        width: `${balloon.size}px`,
        height: `${balloon.size * 1.2}px`,
      }}
      onClick={handlePop}
    >
      <div
        className={`w-full h-full rounded-full ${balloon.color} shadow-lg border-2 border-white/50 bg-gradient-to-br from-white/30 via-transparent to-black/20 transform -rotate-12 flex items-center justify-center`}
      >
        <div className="w-1/2 h-1/2 bg-white/20 rounded-full blur-sm"></div>
      </div>
      <div
        className={`absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0
        border-l-[${balloon.size * 0.1}px] border-l-transparent
        border-t-[${balloon.size * 0.15}px] ${balloon.color.replace('bg-', 'border-t-')}
        border-r-[${balloon.size * 0.1}px] border-r-transparent`}
      ></div>
    </div>
  );
};

export default memo(Balloon);
