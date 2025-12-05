// src/components/ErrorBox.jsx
export default function ErrorBox({ message }) {
  if (!message) return null;

  return (
    <div className="auth-error">
      {message}
    </div>
  );
}
