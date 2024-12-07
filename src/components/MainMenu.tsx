import React from 'react';
import { Trophy, Users, User, Settings, Volume2, VolumeX } from 'lucide-react';
import { GameSettings } from '../types/game';

interface MainMenuProps {
  onStart: () => void;
  settings: GameSettings;
  onUpdateSettings: (settings: GameSettings) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStart, settings, onUpdateSettings }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Soccer Stars</h1>
          <p className="text-gray-600">Challenge your friends or play against AI</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              onUpdateSettings({ ...settings, playerMode: 'single' });
              onStart();
            }}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <User className="w-5 h-5" />
            Single Player
          </button>

          <button
            onClick={() => {
              onUpdateSettings({ ...settings, playerMode: 'multi' });
              onStart();
            }}
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            Two Players
          </button>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              className="flex-1 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-gray-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => onUpdateSettings({
                ...settings,
                difficulty: settings.difficulty === 'easy' ? 'medium' : settings.difficulty === 'medium' ? 'hard' : 'easy'
              })}
              className="flex-1 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="capitalize">{settings.difficulty}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};