import { createContext, useCallback, useMemo, useState } from "react";

export const ToastContext = createContext(null);

let idCounter = 1;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = "info") => {
    const id = idCounter++;
    setToasts((prev) => [...prev, { id, message, type }]);
    // 4 sn sonra sil
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* container burada render edilsin */}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 99999,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: t.type === "error" ? "#ffe5e5" : "rgba(25,25,25,0.9)",
              color: t.type === "error" ? "#8b1a1a" : "#fff",
              padding: "10px 14px",
              borderRadius: 10,
              minWidth: 200,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
