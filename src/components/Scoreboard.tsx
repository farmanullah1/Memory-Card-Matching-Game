interface ScoreboardProps {
  moves: number;
  time: number;
  bestMoves: number;
  bestTime: number;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Scoreboard = ({ moves, time, bestMoves, bestTime }: ScoreboardProps) => {
  return (
    <div className="scoreboard">
      <div className="score-item">
        <span className="score-label">Moves</span>
        <span className="score-value">{moves}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Time</span>
        <span className="score-value">{formatTime(time)}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Best Moves</span>
        <span className="score-value">{bestMoves === Infinity ? '-' : bestMoves}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Best Time</span>
        <span className="score-value">{bestTime === Infinity ? '-' : formatTime(bestTime)}</span>
      </div>
    </div>
  );
};

export default Scoreboard;