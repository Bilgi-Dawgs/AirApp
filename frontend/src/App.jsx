// frontend/src/App.jsx
import React from "react";
import Navbar from "./components/common/Navbar";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <>
      {/* Global top navigation bar */}
      <Navbar />

      {/* All page routes are rendered here */}
      <AppRouter />
    </>
  );
}
