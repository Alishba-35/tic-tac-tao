import "./GameControls.css";

export default function GameControls({ onPlayAgain, onResetScores, onEditPlayers, gameOver }) {
  return (
    <div className="game-controls">
      <button type="button" className="btn btn--primary" onClick={onPlayAgain}>
        {gameOver ? "Play again" : "New round"}
      </button>
      <button type="button" className="btn btn--ghost" onClick={onResetScores}>
        Reset scores
      </button>
      <button type="button" className="btn btn--ghost" onClick={onEditPlayers}>
        Edit players
      </button>
    </div>
  );
}
