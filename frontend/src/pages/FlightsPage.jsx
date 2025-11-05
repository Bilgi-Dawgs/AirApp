import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

//=================================================================

const FlightsPage = () => { //YAĞIZ ->>> İçerik ve Mantık
  return (
    <Box
      sx={{
        backgroundImage: 'url(/hakkımda/hakkımda-xs.jpg)', 
        '@media (min-width: 768px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-sm.jpg)',
        },
        '@media (min-width: 1024px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-md.jpg)',
        },
        '@media (min-width: 1440px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-lg.jpg)',
        },
        '@media (min-width: 1920px)': { 
          backgroundImage: 'url(/hakkımda/hakkımda-xl.jpg)',
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { base: 4, md: 8 }, 
        px: 2,
      }}
    >
      <Container maxWidth="md"> {/* İçerik alanı daha geniş olabilir */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
            borderRadius: 3,
            p: 4,
            textAlign: 'center',
            boxShadow: 6,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Uçuş Arama Sonuçları
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            (Kişi 2 burayı dolduracak: Filtrelenen uçuşlar listelenecek.)
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Ana Sayfaya Dön
          </Button>
          {/* YAĞIZ --->  uçuş listesini ve detay butonlarını vs vs neler lazımsa */}
        </Box>
      </Container>
    </Box>
  );
};

export default FlightsPage;
