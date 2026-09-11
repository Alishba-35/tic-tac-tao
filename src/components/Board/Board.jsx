import Cell from "./Cell";
import "./Board.css";

export default function Board({ board, onCellClick, winningLine, gameOver }) {
  return (
    <div className="board" role="grid" aria-label="Tic tac toe board">
      {board.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          onClick={() => onCellClick(index)}
          disabled={gameOver}
          isWinning={winningLine?.includes(index)}
        />
      ))}
    </div>
  );
}
