export const calculateTokens = (winner: number, loser: number): [number, number] => {
  const transferAmount = Math.floor(loser * 0.8);
  return [winner + transferAmount, loser - transferAmount];
};

export const checkWinner = (players: [Player, Player]): Player | null => {
  if (players[0].score > players[1].score) return players[0];
  if (players[1].score > players[0].score) return players[1];
  return null;
};

export const computerMove = (): boolean => {
  return Math.random() > 0.5;
};