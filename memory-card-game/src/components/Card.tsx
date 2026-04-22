import { motion } from 'framer-motion';
import type { Card as CardType } from '../../types';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  disabled: boolean;
}

const Card = ({ card, onClick, disabled }: CardProps) => {
  return (
    <motion.div
      className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={() => !disabled && !card.isFlipped && !card.isMatched && onClick(card.id)}
      whileHover={{ scale: disabled || card.isFlipped || card.isMatched ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      <div className="card-inner">
        <div className="card-face card-front">
          <span>?</span>
        </div>
        <div className="card-face card-back">
          <span>{card.emoji}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
