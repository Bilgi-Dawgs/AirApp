<<<<<<< HEAD
// src/App.jsx
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import AppRouter from "./router/AppRouter.jsx";

import AuthProvider from "./context/AuthContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import ToastProvider from "./context/ToastContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Navbar />

          <main style={{ minHeight: "80vh" }}>
            <AppRouter />
          </main>

          <Footer />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
=======
import React from 'react';
import { Box } from '@mui/material';
import AppRouter from './router/AppRouter';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer'; 

//==========================================================

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {}
      <Navbar />

      {}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {}
        <AppRouter />
      </Box>

      {}
      <Footer />
      
    </Box>
  );
}

export default App;
>>>>>>> ce358d0d1d943d642656346adb56051da0a50013
