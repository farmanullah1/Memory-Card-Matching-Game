export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface HighScore {
  bestMoves: number;
  bestTime: number;
}

export type SkinMode = 'default' | 'ocean' | 'sunset' | 'neon';