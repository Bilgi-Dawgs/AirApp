// src/components/Input.jsx
export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  ...rest
}) {
  return (
    <div className="form-row">
      <div className="form-label">{label}</div>

      <div className="form-input">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      </div>
    </div>
  );
}
