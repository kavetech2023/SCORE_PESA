import React from 'react';
import { Pause } from 'lucide-react';

interface ScoreBoardProps {
  player1Score: number;
  player2Score: number;
  onPause: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ player1Score, player2Score, onPause }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm font-bold text-blue-600">P1</p>
            <p className="text-2xl font-bold">{player1Score}</p>
          </div>
          <div className="text-xl font-bold text-gray-400">:</div>
          <div className="text-center">
            <p className="text-sm font-bold text-red-600">P2</p>
            <p className="text-2xl font-bold">{player2Score}</p>
          </div>
        </div>
        <button
          onClick={onPause}
          className="p-1 hover:bg-gray-100 rounded-lg transition"
        >
          <Pause className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};