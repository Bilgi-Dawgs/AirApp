<<<<<<< HEAD
// src/main.jsx
=======
>>>>>>> ce358d0d1d943d642656346adb56051da0a50013
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
<<<<<<< HEAD

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
=======
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/**/}
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
>>>>>>> ce358d0d1d943d642656346adb56051da0a50013
    </BrowserRouter>
  </React.StrictMode>
);
