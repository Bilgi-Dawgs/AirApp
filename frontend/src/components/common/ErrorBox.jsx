import React from 'react';
import { Box } from '@mui/material'; 
import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

//===========================================================================

const ErrorBox = ({ message = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginTop: 2,
        backgroundColor: '#FFF0F0',
        border: '1px solid #D93030',
        borderRadius: 2,
        color: '#D93030',
      }}
    >
      <ErrorIcon sx={{ fontSize: '2rem', mb: 1 }} />
      <Typography variant="body1" align="center">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorBox;