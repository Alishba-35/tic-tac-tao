import { useEffect, useState } from "react";
import PlayerSetup from "./components/PlayerSetup/PlayerSetup";
import Board from "./components/Board/Board";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import StatusBanner from "./components/StatusBanner/StatusBanner";
import GameControls from "./components/GameControls/GameControls";
import GameHistory from "./components/GameHistory/GameHistory";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { EMPTY_BOARD, findWinner, isDraw } from "./utils/gameLogic";
import { STORAGE_KEYS, loadValue } from "./utils/storage";
import "./App.css";

const DEFAULT_PLAYERS = {
  X: "Player X",
  O: "Player O",
};

const DEFAULT_SCORES = {
  X: 0,
  O: 0,
  draws: 0,
};

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

export default function App() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, "dark");

  const [players, setPlayers] = useLocalStorage(
    STORAGE_KEYS.players,
    DEFAULT_PLAYERS,
  );

  const [scores, setScores] = useLocalStorage(
    STORAGE_KEYS.scores,
    DEFAULT_SCORES,
  );

  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.history, []);

  const [showSetup, setShowSetup] = useState(
    () => loadValue(STORAGE_KEYS.players, null) === null,
  );

  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [roundRecorded, setRoundRecorded] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const winnerInfo = findWinner(board);
  const draw = isDraw(board);
  const gameOver = Boolean(winnerInfo) || draw;

  useEffect(() => {
    if (!gameOver || roundRecorded) return;

    if (winnerInfo) {
      const symbol = winnerInfo.symbol;

      setScores((prev) => ({
        ...prev,
        [symbol]: prev[symbol] + 1,
      }));

      setHistory((prev) =>
        [
          {
            id: makeId(),
            result: `${players[symbol]} won`,
          },
          ...prev,
        ].slice(0, 10),
      );
    } else {
      setScores((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));

      setHistory((prev) =>
        [
          {
            id: makeId(),
            result: "Draw",
          },
          ...prev,
        ].slice(0, 10),
      );
    }

    setRoundRecorded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, roundRecorded]);

  function handleCellClick(index) {
    if (gameOver || board[index]) return;

    const nextBoard = [...board];
    nextBoard[index] = currentTurn;

    setBoard(nextBoard);
    setCurrentTurn((turn) => (turn === "X" ? "O" : "X"));
  }

  function handlePlayAgain() {
    setBoard(EMPTY_BOARD);
    setCurrentTurn("X");
    setRoundRecorded(false);
  }

  function handleResetScores() {
    setScores(DEFAULT_SCORES);
    setHistory([]);
    handlePlayAgain();
  }

  function handleStartSetup({ X, O }) {
    setPlayers({ X, O });
    setShowSetup(false);
    handlePlayAgain();
  }

  function handleClearHistory() {
    setHistory([]);
  }

  if (showSetup) {
    return (
      <div className="app">
        <PlayerSetup initialNames={players} onStart={handleStartSetup} />
      </div>
    );
  }

  const status = gameOver
    ? winnerInfo
      ? {
          kind: "win",
          message: `🎉 ${players[winnerInfo.symbol]} wins!`,
        }
      : {
          kind: "draw",
          message: "🤝 It's a draw!",
        }
    : {
        kind: "turn",
        message: `${players[currentTurn]}'s turn (${currentTurn})`,
      };

  return (
    <div className="app">
      {/* Decorative background */}
      <div className="background-symbol background-symbol--x">X</div>

      <div className="background-symbol background-symbol--o">O</div>

      <header className="app-header">
        <div className="brand">
          <span className="app-eyebrow">CLASSIC GAME · REIMAGINED</span>

          <h1 className="app-title">
            Tic <span>Tac</span> Toe
          </h1>

          <p className="app-subtitle">Think fast. Play smart. Win the grid.</p>
        </div>

        <ThemeToggle
          theme={theme}
          onToggle={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        />
      </header>

      <main className="game-layout">
        {/* LEFT SIDE */}
        <aside className="side-panel how-to-play">
          <div className="panel-icon">🎮</div>

          <h2>How to Play</h2>

          <div className="steps">
            <div className="step">
              <span>01</span>
              <p>Choose your player.</p>
            </div>

            <div className="step">
              <span>02</span>
              <p>Take turns placing X or O.</p>
            </div>

            <div className="step">
              <span>03</span>
              <p>Get three symbols in a row.</p>
            </div>

            <div className="step">
              <span>04</span>
              <p>Complete the line first to win.</p>
            </div>
          </div>

          <div className="quick-tip">
            <strong>💡 Quick Tip</strong>
            <p>
              Watch the corners and always think about your opponent's next
              move.
            </p>
          </div>
        </aside>

        {/* CENTER GAME */}
        <section className="game-center">
          <ScoreBoard
            players={players}
            scores={scores}
            currentTurn={currentTurn}
            gameOver={gameOver}
          />

          <StatusBanner status={status} />

          <div className="board-shell">
            <Board
              board={board}
              onCellClick={handleCellClick}
              winningLine={winnerInfo?.line}
              gameOver={gameOver}
            />
          </div>

          <GameControls
            gameOver={gameOver}
            onPlayAgain={handlePlayAgain}
            onResetScores={handleResetScores}
            onEditPlayers={() => setShowSetup(true)}
          />
        </section>

        {/* RIGHT SIDE */}
        <aside className="side-panel history-panel-wrapper">
          <div className="panel-icon">🏆</div>

          <h2>Game History</h2>

          <p className="panel-description">
            Your latest matches are automatically saved.
          </p>

          <GameHistory history={history} onClear={handleClearHistory} />
        </aside>
      </main>

      <footer className="app-footer">
        <span>Made with React</span>
        <span>•</span>
        <span>Have fun!</span>
      </footer>
    </div>
  );
}
