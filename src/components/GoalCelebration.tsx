import React, { useEffect, useState } from 'react';

interface GoalCelebrationProps {
  isVisible: boolean;
}

export const GoalCelebration: React.FC<GoalCelebrationProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="text-6xl font-bold text-yellow-400 animate-bounce shadow-text">
        GOAL!
      </div>
    </div>
  );
};