import React, { useEffect, useRef, useState } from 'react';
import { GoalPost } from './GoalPost';
import { GoalCelebration } from './GoalCelebration';
import { Player } from './Player';
import { calculateCollision, calculateVelocity, movePlayer, Vector2D } from '../utils/physics';
import { GameSettings } from '../types/game';

interface GameFieldProps {
  onScore: (playerId: number) => void;
  settings: GameSettings;
}

const ASPECT_RATIO = 1.6;
const BALL_SIZE = 32;
const PLAYER_SIZE = 32;
const GOAL_WIDTH = 150;
const BALL_SPEED = 12;
const PLAYER_SPEED = 3;
const COLLISION_BOOST = 1.5;
const GOAL_PAUSE_DURATION = 1500; // 1.5 seconds

export const GameField: React.FC<GameFieldProps> = ({ onScore, settings }) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [fieldDimensions, setFieldDimensions] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState<Vector2D>({ x: 0, y: 0 });
  const [ballPos, setBallPos] = useState<Vector2D>({ x: 0, y: 0 });
  const [ballVelocity, setBallVelocity] = useState<Vector2D>({ x: 5, y: 5 });
  const [isDragging, setIsDragging] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [topPlayers, setTopPlayers] = useState<Vector2D[]>([]);
  const lastUpdateTime = useRef<number>(performance.now());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const updateDimensions = () => {
      if (!fieldRef.current) return;
      
      const container = fieldRef.current.parentElement;
      if (!container) return;
      
      const containerHeight = container.clientHeight;
      const width = containerHeight / ASPECT_RATIO;
      const height = containerHeight;
      
      setFieldDimensions({ width, height });
      
      setMousePos({ x: width / 2, y: height * 0.8 });
      setBallPos({ x: width / 2, y: height / 2 });
      
      setTopPlayers(
        Array.from({ length: 5 }, (_, i) => ({
          x: width * 0.1 + (i * width * 0.2),
          y: height * 0.2
        }))
      );
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!fieldRef.current || isPaused) return;
      const rect = fieldRef.current.getBoundingClientRect();
      setMousePos({
        x: Math.max(PLAYER_SIZE/2, Math.min(fieldDimensions.width - PLAYER_SIZE/2, 
          ((e.clientX - rect.left) / rect.width) * fieldDimensions.width)),
        y: Math.max(fieldDimensions.height/2, Math.min(fieldDimensions.height - PLAYER_SIZE/2, 
          ((e.clientY - rect.top) / rect.height) * fieldDimensions.height))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [fieldDimensions, isPaused]);

  const resetBall = () => {
    setBallPos({ x: fieldDimensions.width / 2, y: fieldDimensions.height / 2 });
    const angle = Math.random() * Math.PI * 2;
    const newVelocity = {
      x: Math.cos(angle) * BALL_SPEED,
      y: Math.sin(angle) * BALL_SPEED
    };
    setBallVelocity(newVelocity);
    return { x: fieldDimensions.width / 2, y: fieldDimensions.height / 2 };
  };

  const normalizeBallSpeed = (vx: number, vy: number, speed: number = BALL_SPEED) => {
    const currentSpeed = Math.sqrt(vx * vx + vy * vy);
    return {
      x: (vx / currentSpeed) * speed,
      y: (vy / currentSpeed) * speed
    };
  };

  useEffect(() => {
    const updatePlayers = () => {
      if (isPaused) return;
      setTopPlayers(prev => prev.map((pos, i) => {
        const baseX = fieldDimensions.width * 0.1 + (i * fieldDimensions.width * 0.2);
        const targetX = baseX + Math.sin(Date.now() / 1000 + i) * (fieldDimensions.width * 0.05);
        return movePlayer(pos, { x: targetX, y: pos.y }, PLAYER_SPEED);
      }));
    };

    const interval = setInterval(updatePlayers, 16);
    return () => clearInterval(interval);
  }, [fieldDimensions, isPaused]);

  useEffect(() => {
    const updateBall = (timestamp: number) => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(updateBall);
        return;
      }

      const deltaTime = (timestamp - lastUpdateTime.current) / 16;
      lastUpdateTime.current = timestamp;

      setBallPos(prev => {
        let newX = prev.x + ballVelocity.x * deltaTime;
        let newY = prev.y + ballVelocity.y * deltaTime;
        let newVel = { x: ballVelocity.x, y: ballVelocity.y };

        // Check for goals
        if (newY <= PLAYER_SIZE || newY >= fieldDimensions.height - PLAYER_SIZE) {
          if (Math.abs(newX - fieldDimensions.width / 2) < GOAL_WIDTH / 2) {
            onScore(newY <= PLAYER_SIZE ? 1 : 0);
            setShowGoal(true);
            setIsPaused(true);
            
            setTimeout(() => {
              setShowGoal(false);
              setIsPaused(false);
            }, GOAL_PAUSE_DURATION);
            
            return resetBall();
          }
        }

        // Wall collisions
        if (newX <= BALL_SIZE/2 || newX >= fieldDimensions.width - BALL_SIZE/2) {
          newVel.x = -newVel.x;
          newX = newX <= BALL_SIZE/2 ? BALL_SIZE/2 : fieldDimensions.width - BALL_SIZE/2;
        }
        if (newY <= BALL_SIZE/2 || newY >= fieldDimensions.height - BALL_SIZE/2) {
          newVel.y = -newVel.y;
          newY = newY <= BALL_SIZE/2 ? BALL_SIZE/2 : fieldDimensions.height - BALL_SIZE/2;
        }

        // Check collisions with cursor player
        const cursorDx = newX - mousePos.x;
        const cursorDy = newY - mousePos.y;
        const cursorDistance = Math.sqrt(cursorDx * cursorDx + cursorDy * cursorDy);
        
        if (cursorDistance < PLAYER_SIZE) {
          const angle = Math.atan2(cursorDy, cursorDx);
          newVel = {
            x: Math.cos(angle) * BALL_SPEED * COLLISION_BOOST,
            y: Math.sin(angle) * BALL_SPEED * COLLISION_BOOST
          };
          const separation = PLAYER_SIZE - cursorDistance;
          newX += Math.cos(angle) * separation;
          newY += Math.sin(angle) * separation;
        }

        // Check collisions with top players
        topPlayers.forEach(playerPos => {
          const dx = newX - playerPos.x;
          const dy = newY - playerPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < PLAYER_SIZE) {
            const angle = Math.atan2(dy, dx);
            newVel = {
              x: Math.cos(angle) * BALL_SPEED * COLLISION_BOOST,
              y: Math.sin(angle) * BALL_SPEED * COLLISION_BOOST
            };
            const separation = PLAYER_SIZE - distance;
            newX += Math.cos(angle) * separation;
            newY += Math.sin(angle) * separation;
          }
        });

        // Normalize ball speed
        newVel = normalizeBallSpeed(newVel.x, newVel.y);
        setBallVelocity(newVel);
        
        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(updateBall);
    };

    animationFrameRef.current = requestAnimationFrame(updateBall);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ballVelocity, mousePos, topPlayers, onScore, fieldDimensions, isPaused]);

  return (
    <div
      ref={fieldRef}
      style={{
        width: `${fieldDimensions.width}px`,
        height: `${fieldDimensions.height}px`
      }}
      className="relative bg-green-600 rounded-xl overflow-hidden cursor-none"
      onMouseDown={handleMouseDown}
    >
      {/* Field markings */}
      <div className="absolute inset-0">
        <div className="h-px w-full bg-white absolute top-1/2 opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      </div>

      <GoalPost side="top" />
      <GoalPost side="bottom" />
      <GoalCelebration isVisible={showGoal} />

      {/* Top Players */}
      {topPlayers.map((pos, i) => (
        <Player key={`top-${i}`} position={pos} color="bg-blue-500" />
      ))}

      {/* Ball */}
      <div
        style={{
          transform: `translate(${ballPos.x}px, ${ballPos.y}px)`,
          transition: 'transform 0.016s linear'
        }}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div className="w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md" />
      </div>

      {/* Cursor Player */}
      <div
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div className={`w-8 h-8 ${isDragging ? 'bg-yellow-500' : 'bg-purple-500'} rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg`} />
      </div>
    </div>
  );
};