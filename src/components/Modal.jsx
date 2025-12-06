// src/components/Modal.jsx
import React from "react";
import clsx from "clsx";

export default function Modal({
  open,
  onClose,
  children,
  size = "md",
  closeOnBackdrop = true,
  hideClose = false,
  noBackdrop = false,
}) {
  if (!open) return null;

  const dialogClass = clsx("modal__dialog", {
    "modal__dialog--sm": size === "sm",
    "modal__dialog--md": size === "md",
    "modal__dialog--lg": size === "lg",
  });

  const outerStyle = noBackdrop ? { pointerEvents: "none" } : undefined;
  const innerStyle = noBackdrop ? { pointerEvents: "auto" } : undefined;

  const handleBackdrop = () => {
    if (!noBackdrop && closeOnBackdrop) onClose?.();
  };

  return (
    <div className="modal" style={outerStyle}>
      {!noBackdrop && (
        <div className="modal__backdrop" onClick={handleBackdrop} />
      )}

      <div className={dialogClass} style={innerStyle}>
        {!hideClose && (
          <button className="modal__close" onClick={onClose}>
            ✖
          </button>
        )}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
