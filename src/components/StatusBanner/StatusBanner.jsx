import "./StatusBanner.css";

export default function StatusBanner({ status }) {
  const { kind, message } = status;
  return (
    <div className={`status-banner status-banner--${kind}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
