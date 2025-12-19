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