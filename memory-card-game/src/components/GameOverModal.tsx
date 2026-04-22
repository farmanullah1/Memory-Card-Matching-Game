import { motion } from 'framer-motion';

interface GameOverModalProps {
  moves: number;
  time: number;
  onPlayAgain: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const GameOverModal = ({ moves, time, onPlayAgain }: GameOverModalProps) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <h2 className="modal-title">🎉 You Win!</h2>
        <p>Congratulations! You've matched all the cards.</p>
        
        <div className="modal-stats">
          <div className="modal-stat">
            <span className="modal-stat-label">Moves</span>
            <span className="modal-stat-value">{moves}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">Time</span>
            <span className="modal-stat-value">{formatTime(time)}</span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onPlayAgain}>
          🔄 Play Again
        </button>

        <a 
          href="https://farmanullah1.github.io/My-Portfolio/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="portfolio-link"
        >
          Visit My Portfolio →
        </a>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal;
