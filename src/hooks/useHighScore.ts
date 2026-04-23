import { useState, useEffect, useCallback } from 'react';
import type { HighScore } from '../types';

const STORAGE_KEY = 'memory-game-highscore';

export const useHighScore = () => {
  const [highScore, setHighScore] = useState<HighScore>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { bestMoves: Infinity, bestTime: Infinity };
  });

  const updateHighScore = useCallback((moves: number, time: number) => {
    setHighScore(prev => {
      const newBestMoves = moves < prev.bestMoves ? moves : prev.bestMoves;
      const newBestTime = time < prev.bestTime ? time : prev.bestTime;
      const newHighScore = { bestMoves: newBestMoves, bestTime: newBestTime };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHighScore));
      return newHighScore;
    });
  }, []);

  const resetHighScore = useCallback(() => {
    const newHighScore = { bestMoves: Infinity, bestTime: Infinity };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHighScore));
    setHighScore(newHighScore);
  }, []);

  return { highScore, updateHighScore, resetHighScore };
};