import { useState } from "react";
import "./PlayerSetup.css";

export default function PlayerSetup({ initialNames, onStart }) {
  const [nameX, setNameX] = useState(initialNames.X ?? "");
  const [nameO, setNameO] = useState(initialNames.O ?? "");

  function handleSubmit(event) {
    event.preventDefault();
    onStart({
      X: nameX.trim() || "Player X",
      O: nameO.trim() || "Player O",
    });
  }

  return (
    <div className="setup-screen">
      <form className="setup-card" onSubmit={handleSubmit}>
        <p className="setup-eyebrow">Classic game, reimagined</p>
        <h1 className="setup-title">Tic&nbsp;Tac&nbsp;Toe</h1>

        <div className="setup-field">
          <label htmlFor="playerX">Player X</label>
          <input
            id="playerX"
            type="text"
            placeholder="Player X"
            value={nameX}
            onChange={(event) => setNameX(event.target.value)}
            maxLength={16}
            autoFocus
          />
        </div>

        <div className="setup-field">
          <label htmlFor="playerO">Player O</label>
          <input
            id="playerO"
            type="text"
            placeholder="Player O"
            value={nameO}
            onChange={(event) => setNameO(event.target.value)}
            maxLength={16}
          />
        </div>

        <button type="submit" className="setup-start-btn">
          Start game
        </button>
      </form>
    </div>
  );
}
