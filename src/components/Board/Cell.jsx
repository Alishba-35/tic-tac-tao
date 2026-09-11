export default function Cell({ value, onClick, disabled, isWinning, index }) {
  return (
    <button
      type="button"
      className={`cell${value ? ` cell--${value.toLowerCase()}` : ""}${
        isWinning ? " cell--winning" : ""
      }`}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={`Cell ${index + 1}${value ? `, ${value}` : ", empty"}`}
    >
      {value}
    </button>
  );
}
