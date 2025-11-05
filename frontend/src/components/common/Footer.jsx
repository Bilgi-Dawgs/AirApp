import React from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; 

//===========================================================================


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto', 
        backgroundColor: 'rgba(1, 18, 54, 0.84)',
        color: '#04eeffff', 
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Uçuş Firması
        </Typography>
        <Box>
          <MuiLink component={Link} to="/about" color="inherit" sx={{ ml: 2 }}>
            Hakkımızda
          </MuiLink>
          <MuiLink component={Link} to="/privacy" color="inherit" sx={{ ml: 2 }}>
            Gizlilik Politikası
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
