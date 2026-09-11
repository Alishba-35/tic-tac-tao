import "./GameHistory.css";

export default function GameHistory({ history, onClear }) {
  return (
    <div className="history">
      {history.length === 0 ? (
        <div className="history-empty">No games played yet.</div>
      ) : (
        <>
          <div className="history-header">
            <span>Game History</span>
            <span className="history-count">{history.length}</span>
          </div>

          <div className="history-list">
            {history.map((game) => (
              <div className="history-item" key={game.id}>
                <span className="history-dot" />
                <span>{game.result}</span>
              </div>
            ))}
          </div>

          <button type="button" className="clear-history" onClick={onClear}>
            <span>⌫</span>
            Clear History
          </button>
        </>
      )}
    </div>
  );
}
