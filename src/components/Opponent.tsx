// Opponent.tsx
import React, { useEffect, useState } from 'react';
import { Vector2D } from '../utils/physics';

interface OpponentProps {
  ballPos: Vector2D;
}

export const Opponent: React.FC<OpponentProps> = ({ ballPos }) => {
  const [pos, setPos] = useState<Vector2D>({ x: 50, y: 250 }); // Start on the left side

  useEffect(() => {
    const moveOpponent = () => {
      if (ballPos.y < pos.y) {
        setPos((prev) => ({ ...prev, y: Math.max(prev.y - 2, 0) })); // Move up
      } else if (ballPos.y > pos.y + 32) {
        setPos((prev) => ({ ...prev, y: Math.min(prev.y + 2, 500 - 32) })); // Move down
      }
    };

    moveOpponent();
  }, [ballPos, pos]);

  return (
    <div
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
      className="absolute w-8 h-8 bg-black rounded-full"
    />
  );
};