import "./ScoreBoard.css";

export default function ScoreBoard({ players, scores, currentTurn, gameOver }) {
  return (
    <div className="scoreboard" role="group" aria-label="Score board">
      <PlayerScore
        label={players.X}
        symbol="X"
        score={scores.X}
        active={!gameOver && currentTurn === "X"}
      />
      <div className="scoreboard-draws">
        <span className="scoreboard-draws-label">Draws</span>
        <span className="scoreboard-draws-value">{scores.draws}</span>
      </div>
      <PlayerScore
        label={players.O}
        symbol="O"
        score={scores.O}
        active={!gameOver && currentTurn === "O"}
      />
    </div>
  );
}

function PlayerScore({ label, symbol, score, active }) {
  return (
    <div className={`player-score player-score--${symbol.toLowerCase()}${active ? " player-score--active" : ""}`}>
      <span className="player-score-symbol">{symbol}</span>
      <span className="player-score-name">{label}</span>
      <span className="player-score-value">{score}</span>
    </div>
  );
}
