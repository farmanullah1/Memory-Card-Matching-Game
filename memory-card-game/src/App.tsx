import { useState, useCallback, useEffect, useRef } from 'react';
import type { Card, SkinMode } from '../types';
import Scoreboard from './components/Scoreboard';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useHighScore } from './hooks/useHighScore';
import { useSound } from './hooks/useSound';
import './styles/index.css';

// Emojis for the cards (8 pairs)
const CARD_EMOJIS = ['🎮', '🎯', '🎲', '🎨', '🎭', '🎪', '🎢', '🎡'];

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create initial cards
const createCards = (): Card[] => {
  const pairs = [...CARD_EMOJIS, ...CARD_EMOJIS];
  const shuffled = shuffleArray(pairs);
  return shuffled.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

function App() {
  // Game state
  const [cards, setCards] = useState<Card[]>(createCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  
  // Theme state
  const [currentSkin, setCurrentSkin] = useState<SkinMode>(() => {
    const stored = localStorage.getItem('memory-game-skin');
    return (stored as SkinMode) || 'default';
  });
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('memory-game-theme');
    return stored === 'dark';
  });

  // Custom hooks
  const { highScore, updateHighScore } = useHighScore();
  const { isMuted, toggleMute, playSound } = useSound();

  // Timer state with requestAnimationFrame
  const [time, setTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Start/stop timer based on game state
  useEffect(() => {
    if (isGameActive && !isWon) {
      if (!timerRef.current) {
        startTimeRef.current = Date.now() - time * 1000;
        
        const tick = () => {
          setTime((Date.now() - startTimeRef.current) / 1000);
          timerRef.current = requestAnimationFrame(tick);
        };
        
        timerRef.current = requestAnimationFrame(tick);
      }
    } else {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isGameActive, isWon]);

  // Apply theme and skin
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-skin', currentSkin);
    localStorage.setItem('memory-game-skin', currentSkin);
    localStorage.setItem('memory-game-theme', isDark ? 'dark' : 'light');
  }, [currentSkin, isDark]);

  // Check for win condition
  useEffect(() => {
    if (matchedPairs === 8 && isGameActive) {
      setIsWon(true);
      setIsGameActive(false);
      updateHighScore(moves, time);
      playSound('win');
    }
  }, [matchedPairs, isGameActive, moves, time, updateHighScore, playSound]);

  // Handle card click
  const handleCardClick = useCallback((id: number) => {
    if (!isGameActive) {
      setIsGameActive(true);
    }

    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));
    playSound('flip');

    setFlippedCards(prev => {
      const newFlipped = [...prev, id];
      
      if (newFlipped.length === 2) {
        setMoves(m => m + 1);
        
        const [firstId, secondId] = newFlipped;
        setCards(currentCards => {
          const firstCard = currentCards.find(c => c.id === firstId);
          const secondCard = currentCards.find(c => c.id === secondId);
          
          if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
            // Match found
            setTimeout(() => {
              setCards(cards => cards.map(card => 
                card.id === firstId || card.id === secondId 
                  ? { ...card, isMatched: true } 
                  : card
              ));
              setMatchedPairs(prev => prev + 1);
            }, 300);
            playSound('match');
            return currentCards.map(card => 
              card.id === firstId || card.id === secondId 
                ? { ...card, isMatched: true } 
                : card
            );
          } else {
            // No match - flip back after delay
            setTimeout(() => {
              setCards(cards => cards.map(card => 
                card.id === firstId || card.id === secondId 
                  ? { ...card, isFlipped: false } 
                  : card
              ));
            }, 1000);
          }
          
          return currentCards;
        });
        
        return [];
      }
      
      return newFlipped;
    });
  }, [isGameActive, playSound]);

  // Start new game (resets everything including high scores)
  const handleNewGame = useCallback(() => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
    setIsWon(false);
    setMatchedPairs(0);
  }, []);

  // Reset game (shuffle board, keep high scores)
  const handleResetGame = useCallback(() => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
    setIsWon(false);
    setMatchedPairs(0);
  }, []);

  // Toggle dark mode
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  // Change skin
  const changeSkin = useCallback((skin: SkinMode) => {
    setCurrentSkin(skin);
  }, []);

  return (
    <div className="app">
      <ThemeSwitcher
        currentSkin={currentSkin}
        isDark={isDark}
        onSkinChange={changeSkin}
        onThemeToggle={toggleTheme}
        isMuted={isMuted}
        onMuteToggle={toggleMute}
      />

      <header className="header">
        <h1 className="title">Memory Card Game</h1>
        <p className="subtitle">Find all matching pairs!</p>
      </header>

      <Scoreboard
        moves={moves}
        time={time}
        bestMoves={highScore.bestMoves}
        bestTime={highScore.bestTime}
      />

      <div className="controls">
        <button className="btn btn-primary" onClick={handleNewGame}>
          🆕 New Game
        </button>
        <button className="btn btn-secondary" onClick={handleResetGame}>
          🔄 Reset Game
        </button>
      </div>

      <GameBoard
        cards={cards}
        onCardClick={handleCardClick}
        disabled={flippedCards.length >= 2}
      />

      {isWon && (
        <GameOverModal
          moves={moves}
          time={time}
          onPlayAgain={handleResetGame}
        />
      )}
    </div>
  );
}

export default App;
