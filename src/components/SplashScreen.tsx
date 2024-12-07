import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">Soccer Stars</h1>
        <p className="text-white/80">Get ready to play!</p>
      </div>
    </div>
  );
};