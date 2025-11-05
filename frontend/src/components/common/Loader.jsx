import React from 'react';
import { Box } from '@mui/material'; 
import { CircularProgress } from '@mui/material'; 
import { Typography } from '@mui/material';

//===========================================================================

const Loader = ({ text = 'Yükleniyor...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        minHeight: '250px',
      }}
    >
      <CircularProgress /> {}
      <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;