export interface Vector2D {
  x: number;
  y: number;
}

export const calculateVelocity = (from: Vector2D, to: Vector2D, speed: number): Vector2D => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance === 0) return { x: 0, y: 0 };
  
  return {
    x: (dx / distance) * speed,
    y: (dy / distance) * speed
  };
};

export const calculateCollision = (ballPos: Vector2D, playerPos: Vector2D, ballVel: Vector2D): Vector2D => {
  const dx = ballPos.x - playerPos.x;
  const dy = ballPos.y - playerPos.y;
  const angle = Math.atan2(dy, dx);
  
  const speed = Math.sqrt(ballVel.x * ballVel.x + ballVel.y * ballVel.y);
  const newSpeed = Math.max(speed * 1.1, 10);
  
  return {
    x: Math.cos(angle) * newSpeed,
    y: Math.sin(angle) * newSpeed
  };
};

export const movePlayer = (currentPos: Vector2D, targetPos: Vector2D, speed: number): Vector2D => {
  const dx = targetPos.x - currentPos.x;
  const dy = targetPos.y - currentPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < speed) return targetPos;
  
  return {
    x: currentPos.x + (dx / distance) * speed,
    y: currentPos.y + (dy / distance) * speed
  };
};