import React from 'react';

interface GameInstructionsProps {
  isComputer: boolean;
}

export const GameInstructions: React.FC<GameInstructionsProps> = ({ isComputer }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4 text-center">
      <h3 className="font-bold mb-2">Controls</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-blue-500">Player 1</p>
          <p>W - Move Up</p>
          <p>S - Move Down</p>
          <p>A - Move Left</p>
          <p>D - Move Right</p>
        </div>
        {!isComputer && (
          <div>
            <p className="font-semibold text-red-500">Player 2</p>
            <p>↑ - Move Up</p>
            <p>↓ - Move Down</p>
            <p>← - Move Left</p>
            <p>→ - Move Right</p>
          </div>
        )}
      </div>
    </div>
  );
};