// src/components/UI/Select.jsx
export default function Select({
  label,
  value,
  onChange,
  children,
}) {
  return (
    <div className="form-row">
      <div className="form-label">{label}:</div>

      <div className="form-input">
        <select value={value} onChange={onChange}>
          {children}
        </select>
      </div>
    </div>
  );
}
