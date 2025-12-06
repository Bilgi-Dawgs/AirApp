// src/components/UI/Button.jsx
export default function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  onClick,
  style,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`ui-btn ${disabled ? "ui-btn--disabled" : ""} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
