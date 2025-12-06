export default function Loader() {
  const size = 36;
  const border = 4;

  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${border}px solid #ddd`,
        borderTopColor: "#111",
        borderRadius: "50%",
        animation: "spin 0.9s linear infinite",
      }}
    >
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}
