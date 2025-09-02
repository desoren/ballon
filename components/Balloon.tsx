import React, { useEffect, memo } from 'react';
import type { Balloon as BalloonType } from '../types';
import { BAD_BALLOON_COLOR } from '../constants';


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

  const isBadBalloon = balloon.color === BAD_BALLOON_COLOR;

  const balloonBodyClasses = [
    "w-full h-full rounded-full shadow-lg transform -rotate-12 flex items-center justify-center",
    balloon.color,
    isBadBalloon ? 'border-2 border-gray-400/50' : 'border-2 border-white/50',
    isBadBalloon ? 'bg-gradient-to-br from-gray-200/30 via-transparent to-black/20' : 'bg-gradient-to-br from-white/30 via-transparent to-black/20',
  ].join(' ');

  const knotColorClass = isBadBalloon
    ? 'border-t-gray-400'
    : balloon.color.replace('bg-', 'border-t-');

  const knotClasses = `absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0
    border-l-[${balloon.size * 0.1}px] border-l-transparent
    border-t-[${balloon.size * 0.15}px] ${knotColorClass}
    border-r-[${balloon.size * 0.1}px] border-r-transparent`;


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
      aria-label={isBadBalloon ? "Bad balloon" : "Good balloon"}
    >
      <div className={balloonBodyClasses}>
        <div className="w-1/2 h-1/2 bg-white/20 rounded-full blur-sm"></div>
      </div>
      <div className={knotClasses}></div>
    </div>
  );
};

export default memo(Balloon);