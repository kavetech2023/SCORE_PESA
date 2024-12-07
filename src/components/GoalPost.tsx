import React from 'react';

interface GoalPostProps {
  side: 'top' | 'bottom';
}

export const GoalPost: React.FC<GoalPostProps> = ({ side }) => {
  const isTop = side === 'top';
  
  return (
    <div 
      className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-1/2 -translate-x-1/2 flex flex-col items-center z-10`}
      style={{
        width: '120px',
        height: '20px',
      }}
    >
      <div className="w-full h-2 bg-white shadow-md" />
      <div className="flex justify-between w-full h-full">
        <div className="w-2 h-full bg-white shadow-md" />
        <div className="w-2 h-full bg-white shadow-md" />
      </div>
    </div>
  );
};