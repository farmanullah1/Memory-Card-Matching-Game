import type { Card } from '../../types';

interface GameBoardProps {
  cards: Card[];
  onCardClick: (id: number) => void;
  disabled: boolean;
}

const GameBoard = ({ cards, onCardClick, disabled }: GameBoardProps) => {
  return (
    <div className="game-board">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
          onClick={() => !disabled && !card.isFlipped && !card.isMatched && onCardClick(card.id)}
        >
          <div className="card-inner">
            <div className="card-face card-front">
              <span>?</span>
            </div>
            <div className="card-face card-back">
              <span>{card.emoji}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
