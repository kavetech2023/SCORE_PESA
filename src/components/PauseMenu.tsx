import React from 'react';
import { Play, RotateCcw, Home } from 'lucide-react';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onRestart, onMainMenu }) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-64">
        <h2 className="text-2xl font-bold text-center mb-6">Game Paused</h2>
        <div className="space-y-3">
          <button
            onClick={onResume}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Resume
          </button>
          <button
            onClick={onRestart}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restart
          </button>
          <button
            onClick={onMainMenu}
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};