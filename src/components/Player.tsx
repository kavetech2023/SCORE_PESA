import React from 'react';
import { Vector2D } from '../utils/physics';

interface PlayerProps {
  position: Vector2D;
  color: string;
  isGoalkeeper?: boolean;
}

export const Player: React.FC<PlayerProps> = ({ position, color, isGoalkeeper }) => {
  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="absolute top-0 left-0"
    >
      <div className={`w-8 h-8 ${color} rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg ${isGoalkeeper ? 'ring-2 ring-yellow-400' : ''}`} />
    </div>
  );
}