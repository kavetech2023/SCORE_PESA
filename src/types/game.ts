export type GameState = 'splash' | 'menu' | 'playing' | 'paused';

export interface GameSettings {
  soundEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  playerMode: 'single' | 'multi';
}

export interface Player {
  id: number;
  name: string;
  tokens: number;
  score: number;
}

export interface GameContext {
  state: GameState;
  settings: GameSettings;
  players: [Player, Player];
  currentRound: number;
  totalRounds: number;
}